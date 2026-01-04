const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import btnLogout from "../styles/btnLogout.module.css";


const CerrarSesion = () => {
    const navigate = useNavigate();
    const { setUsuario } = useContext(UserContext);

    const logout = async () => {
        try {
            await fetch(`${API_URL}/api/logout`, {
                method: "POST",
                credentials: "include"
            })
            setUsuario(null);
             navigate("/");
        } catch (error) {
            console.log("Error cerrando sesión:", error);
        }
    }


    return (
        <div className= {btnLogout.exit} >
            <button onClick={logout} >Cerrar Sesión</button>
        </div>
    )
}

export default CerrarSesion
