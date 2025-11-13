import { NavLink } from "react-router-dom"


const Home = () => {
    return (
        <>
            <div className="menu">
                <NavLink to="/login"> Iniciar Sesion </NavLink>
                <NavLink to="/registro"> Registrarse </NavLink>
            </div>
        </>
    )
}

export default Home
