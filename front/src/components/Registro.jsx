import { useState } from "react"
import Atras from "./Atras"
import { NavLink } from "react-router-dom"
import registrarUsuario from "../services/index";



const Registro = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const register = async (e) => {
        e.preventDefault();
        const data = { nombre, apellido, email, password, password2 };

        try {
            const respuesta = await registrarUsuario(data);
            console.log(respuesta);
            if (respuesta.mensaje === "usuario creado correctamente") {
                setNombre('');
                setApellido('');
                setEmail('');
                setPassword('');
                setPassword2('')

            }
        } catch (error) {
            console.log(error) + 'de aca viene el error';
        }

    }

    return (
        <>
            <div className="form-container">
                <form className="formulario" onSubmit={register} >
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" name="apellido" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <label htmlFor="password2">Repetir contraseña</label>
                    <input type="password" name="password2" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} />

                    <button type="submit">Registrarse</button>

                    <span className="changeRegister">
                        <NavLink to="/login">¿Ya tenes cuenta ? Inicia Sesion </NavLink>
                    </span>
                </form>
            </div>
            <Atras />
        </>
    )
}

export default Registro


