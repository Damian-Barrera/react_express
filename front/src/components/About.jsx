import Atras from "./Atras"
import CerrarSesion from "./CerrarSesion"
import { NavLink } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useEffect, useContext, useState } from "react";

const About = () => {

    const navigate = useNavigate();
    const { usuario, cargando, setUsuario } = useContext(UserContext);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('')


    useEffect(() => {
        if (!cargando && !usuario) {
            navigate("/")
        }

        if (usuario) {
            setNombre(usuario.nombre);
            setApellido(usuario.apellido);
            setEmail(usuario.email);
            setDireccion(usuario.direccion || '');
            setTelefono(usuario.telefono || '');
            setMensaje(usuario.mensaje || '');
        }

    }, [cargando, usuario])

    const editar = async (e) => {
        e.preventDefault()

        const res = await fetch("http://localhost:3000/api/edit", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellido, telefono, direccion, email, mensaje })
        });

        const data = await res.json();
        console.log(data.mensaje)

        if (res.ok) {
            setUsuario((prev) => ({
                ...prev,
                nombre,
                apellido,
                email,
                direccion,
                telefono,
                mensaje,
            }));
        }
    }



    return (
        <div>
            <div className="home">
                <NavLink to="/dashboard">  <FaHome className="home" title="Inicio" />
                    Inicio
                </NavLink>
            </div>
            <div className="form-container">
                <form className="formulario" onSubmit={editar} >
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" name="apellido" id="apellido" value={apellido} onChange={e => setApellido(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <label htmlFor="direccion"> Direccion </label>
                    <input type="text" name="direccion" id="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} />

                    <label htmlFor="telefono"> Telefono</label>
                    <input type="tel" name="telefono" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} />

                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea name="mensaje" id="mensaje" rows="4" value={mensaje} onChange={e => setMensaje(e.target.value)} ></textarea>

                    <button type="submit">Guardar Cambios</button>

                </form>
            </div>

            <Atras />
            <CerrarSesion />
        </div>
    )
}

export default About
