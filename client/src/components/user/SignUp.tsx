import { useState } from "react";
import '../../styles/user/Signup.css';
import axios, { AxiosError } from "axios";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            const regexEmail =  /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/; 
            const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
            if(!regexEmail.test(email)) {
                alert("Insira um email válido");
            }else if(!regexPassword.test(password)) {
                alert("Inisira uma senha válida");
            }else if(password !== confirmPassword) {
                alert("O campo senha e o confirmação de senha não correspondem");
            }else{
                await axios.post("http://localhost:4200/signup", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                alert("Dados cadastrados com sucesso");
            }
        }catch(error) {
            if((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
                alert("Usuário já existente, tente se cadastrar com outro");
            }else{
                console.log("Error: " + error);
            }
        }
    }

    return (
        <div>
            <form className="signUpForm">
            <h2>Cadastro</h2>
            <label>Nome</label>
            <input type="text" value={name}
            onChange={(e) => setName(e.target.value)} required/>

            <label>Email</label>
            <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} required/>

            <label>Senha</label>
            <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} required/>

            <label>Confirmar senha</label>
            <input type="password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required/>

            <button type="submit" onClick={handleSignUp}>Cadastrar</button>
            </form>
        </div>
    )
}

export default SignUp