import { useState, useContext } from "react"
import Atras from "./Atras"
import { NavLink, useNavigate } from "react-router-dom"
import { iniciarSesion } from "../services/index";
import { FaHome } from "react-icons/fa";
import UserContext from "../context/UserContext.jsx";


const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUsuario, usuario } = useContext(UserContext);
    // console.log(usuario)
    const logearse = async (e) => {
        e.preventDefault();

        const losDatos = { email, password }

        try {
            const respuesta = await iniciarSesion(losDatos)
            if (respuesta.mensaje === "login exitoso") {
                setUsuario(respuesta.usuario);
                navigate('/dashboard')
            }
            else {
                alert(respuesta.mensaje)
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className="home">
                <NavLink to="/">  <FaHome className="home" title="Inicio" />
                     
                </NavLink>
            </div>
            <div className="form-container">
                <form className="formulario" onSubmit={logearse} >

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type="submit">Iniciar Sesion</button>
                    <span className="changeRegister">
                        <NavLink to="/registro">¿No tenes cuenta? Registrate </NavLink>
                    </span>
                </form>
            </div>


            <Atras />


        </>
    )
}

export default Login
