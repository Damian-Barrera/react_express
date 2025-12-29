import { createContext, useState,useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          credentials: "include", // NECESARIO para enviar la cookie de sesión
        });

        const data = await res.json();

        if (data.usuario) {
          setUsuario(data.usuario);
        }
      } catch (error) {
        console.log("Error verificando sesión:", error);
      } finally {
        setCargando(false);
      }
    };

    verificarSesion();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, cargando }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
