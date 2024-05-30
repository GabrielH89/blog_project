// src/pages/SignIn.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import '../../styles/user/Signin.css';
import Modal from "./Modal";
import SignUp from './SignUp';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (email.trim().length > 0 && password.trim().length > 0) {
                const response = await axios.post("http://localhost:4200/signin", {
                    email: email,
                    password: password
                });
                console.log(response.data);
            }
        } catch (error) {
            if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
                alert("Email ou senha inválidos");
            } else {
                console.log("Error: " + error);
            }
        }
    };

    return (
        <div>
            <form className="signInForm" onSubmit={doLogin}>
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
