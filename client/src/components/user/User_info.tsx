import { useUserData } from "../../utils/useUserData";
import "../../styles/user/User_info.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function User_info() {
  const {userName, userEmail} = useUserData();
  const navigate = useNavigate();
  const [isAccountDeleted, setIsAccountDeleted] = useState(false); 

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    navigate("/");
  }

  const deleteAccount = async () => {
    const confirmDelete = window.confirm("Deseja realmente excluir sua conta?")
    if(confirmDelete) {
      try{
        const token = sessionStorage.getItem('token');
        await axios.delete("http://localhost:4200/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIsAccountDeleted(true);
      }catch(error) {
        console.log("Error: " + error);
      }
    }
  }

  useEffect(() => {
    if (isAccountDeleted) {
        alert("Sua conta foi deletada com sucesso");
        sessionStorage.removeItem('token'); // Remover o token após a exclusão da conta
        navigate("/"); // Redirecionar para a rota raiz após a exclusão da conta
    }
}, [isAccountDeleted, navigate]);

  return (
    <div className="user-info-container">
    <header className="header">
      <h1 className="system-name">Informações pessoais</h1>
      <div className="user-icon" onClick={() => window.location.href = '/posts'}>
        <FontAwesomeIcon icon={faHome as IconProp} />
      </div>
    </header>
    <form id="form">
      <label>Nome</label>
      <input type="text" id="name" value={userName} readOnly disabled />
      <label>Email</label>
      <input type="email" id="email" value={userEmail} readOnly disabled />
    </form>

    <button className="logout" onClick={logout}>Sair</button>
    <button className="delete-account" onClick={deleteAccount}>Exluir conta</button>
  </div>
  )
}

export default User_info