import { useState } from "react"
import Atras from "./Atras"
import { NavLink } from "react-router-dom"
import { iniciarSesion } from "../services/index";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const logearse = async (e) => {
        e.preventDefault();
        
        const losDatos = { email, password }

        try {
            const respuesta = await iniciarSesion(losDatos)
            console.log(respuesta);

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
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
