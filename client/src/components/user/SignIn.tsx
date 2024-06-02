import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import '../../styles/user/Signin.css'; // Certifique-se de que este caminho está correto
import Modal from "./Modal";
import SignUp from './SignUp';
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const navigate = useNavigate();

    const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(""); // Reset the error message before attempting login
        try {
            if (email.trim().length > 0 && password.trim().length > 0) {
                const response = await axios.post("http://localhost:4200/signin", {
                    email: email,
                    password: password
                });
                navigate("/posts");
                console.log(response.data);
                const token = response.data.token;
                localStorage.setItem('token', token);
            }
        } catch (error) {
            if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
                setErrorMessage("Email ou senha inválidos");
                setTimeout(() => {
                    setErrorMessage(""); // Clear the error message after 5 seconds
                }, 5000);
            } else {
                console.log("Error: " + error);
            }
        }
    };

    return (
        <div>
            <form className="signInForm" onSubmit={doLogin}>
                {errorMessage && 
                <div className="error-message" style={{ backgroundColor: '#B22222', color: 'white', padding: '10px', marginBottom: '10px', borderRadius: '5px', textAlign: 'center', fontSize: '1.1rem' }}>
                {errorMessage}</div>}
                <h2>Login</h2>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Entrar</button>
                <p>Não possui uma conta? <Link to="#" onClick={() => setIsSignUpOpen(true)}>Cadastre-se</Link></p>
            </form>
            <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
                <SignUp />
            </Modal>
        </div>
    );
}

export default SignIn;
