import { useState } from "react";
import '../../styles/user/Signup.css';
import axios, { AxiosError } from "axios";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameCharsLimit, setNameCharsLimit] = useState(100);
    const [emailCharsLimit, setEmailCharsLimit] = useState(200);
    const [passwordCharsLimit, setPasswordCharsLimit] = useState(20);
    const [formVisible, setFormVisible] = useState(true); // Estado para controlar a visibilidade do formulário
    const [errorMessage, setErrorMessage] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setNameCharsLimit(100 - e.target.value.length);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailCharsLimit(200 - e.target.value.length);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordCharsLimit(20 - e.target.value.length);
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset the error message before attempting signup

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
    
            const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/; 
            const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
            
            if (!regexEmail.test(email)) {
                setErrorMessage("Insira um email válido");
            } else if (!regexPassword.test(password)) {
                setErrorMessage("Insira uma senha válida");
            } else if (password !== confirmPassword) {
                setErrorMessage("O campo senha e a confirmação de senha não correspondem");
            } else {
                await axios.post("http://localhost:4200/signup", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                setFormVisible(false); // Esconde o formulário após o cadastro bem-sucedido
            }
        } catch (error) {
            if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
                setErrorMessage("Usuário já existente, tente se cadastrar com outro");
                if (errorMessage) {
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            } else {
                console.log("Error: " + error);
            }
        }

    }

    return (
        <div>
            {formVisible ? (
                <form className="signUpForm" onSubmit={handleSignUp}>
                    {errorMessage && 
                        <div className="error-message" 
                        style={{ backgroundColor: '#B22222', color: 'white', padding: '10px', marginBottom: '10px', 
                        borderRadius: '5px', textAlign: 'center', fontSize: '1.1rem' }}>
                    {errorMessage}</div>}
                    <h2>Cadastro</h2>
                    <label>Nome</label>
                    <input type="text" value={name} maxLength={100}
                    onChange={handleNameChange} required />
                    <small>{nameCharsLimit} caracteres restantes</small>

                    <label>Email</label>
                    <input type="email" value={email} maxLength={200}
                    onChange={handleEmailChange} required />
                    <small>{emailCharsLimit} caracteres restantes</small>

                    <label>Senha</label>
                    <input type="password" value={password} maxLength={20}
                    onChange={handlePasswordChange} required />
                    <small>{passwordCharsLimit} caracteres restantes</small>

                    <label>Confirmar senha</label>
                    <input type="password" value={confirmPassword} maxLength={20}
                    onChange={(e) => setConfirmPassword(e.target.value)} required />

                    <button type="submit">Cadastrar</button>
                </form>
            ) : (
                <p>Cadastro realizado com sucesso!</p>
            )}
        </div>
    );
}

export default SignUp;
