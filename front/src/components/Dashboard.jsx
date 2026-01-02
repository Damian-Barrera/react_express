import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import Atras from "./Atras"
import { NavLink, useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import CerrarSesion from "./CerrarSesion";

const Dashboard = () => {
    const navigate = useNavigate()
    const { usuario, cargando } = useContext(UserContext);

    useEffect(() => {
        if (!cargando && !usuario) {
            navigate("/")
        }
    }, [cargando, usuario])

    return (
        <>
            <div className="home">
                <NavLink to="/dashboard">  <FaHome className="home" title="Inicio" />
                    Inicio
                </NavLink>
            </div>
            <div>

                <h3>Este es el dashboard principal !</h3>
                {usuario && (
                    <h4>Bienvenido {usuario.nombre} {usuario.apellido} </h4>
                )}
                {usuario && <p>{usuario.direccion} </p>}
                {usuario && <p>{usuario.email}</p>}

                <p>
                    {usuario && usuario.is_admin ? "User Admin" : "User común"}
                </p>
                <NavLink to="/about" className="edit-profile"> Editar Perfil </NavLink>

                <Atras />

            </div>
            <div>
                <CerrarSesion />
            </div>
        </>
    )
}

export default Dashboard
