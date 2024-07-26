import { useState } from "react";
import '../../styles/user/Signup.css';
import axios, { AxiosError } from "axios";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    /*Estados para os limites de campos dos inputs*/
    const [nameCharsLimit, setNameCharsLimit] = useState(100);
    const [emailCharsLimit, setEmailCharsLimit] = useState(200);
    const [passwordCharsLimit, setPasswordCharsLimit] = useState(20);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
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
            <input type="text" value={name} maxLength={100}
            onChange={handleNameChange} required/>
            <small>{nameCharsLimit} caracteres restantes</small>

            <label>Email</label>
            <input type="email" value={email} maxLength={200}
            onChange={handleEmailChange} required/>
            <small>{emailCharsLimit} caracteres restantes</small>

            <label>Senha</label>
            <input type="password" value={password} maxLength={20}
            onChange={handlePasswordChange} required/>
            <small>{passwordCharsLimit} caracteres restantes</small>

            <label>Confirmar senha</label>
            <input type="password" value={confirmPassword} maxLength={20}
            onChange={(e) => setConfirmPassword(e.target.value)} required/>

            <button type="submit" onClick={handleSignUp}>Cadastrar</button>
            </form>
        </div>
    )
}

export default SignUp