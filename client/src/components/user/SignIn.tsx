import { useState } from "react"
import { Link } from "react-router-dom";
import axios, {AxiosError} from "axios";
import '../../styles/user/Signin.css';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = async (e: { preventDefault: () => void; }) => {
      try{
        e.preventDefault();
        if(email.trim().length > 0 && password.trim().length > 0) {
          const response = await axios.post("http://localhost:4200/signin", {
            email: email,
            password: password
          })
          console.log(response.data);
        }
      }catch(error) {
        if((error as AxiosError).response && (error as AxiosError).response?.status === 400 || 
            (error as AxiosError).response && (error as AxiosError).response?.status) {
                alert("Email ou senha inválidos");
            }else{
                console.log("Error: " + error);
            }  
      }
    }
    return (
      <div>
        <form className="signInForm">
          <h2>Login</h2>

          <label>Email</label>
          <input type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} required/>

          <label>Senha</label>
          <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)} required/>

          <button type="submit" onClick={doLogin}>Entrar</button>
          <p>Não possui uma conta? <Link to="signUp">Cadastre-se</Link></p>
        </form>
      </div>
    )
}

export default SignIn