const API_URL = import.meta.env.VITE_API_URL;


const registrarUsuario = async (datos) => {
  try {
    const res = await fetch(`{${API_URL}/api/registro}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datos),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export default registrarUsuario;

export const iniciarSesion = async (datos) => {
  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datos),
            credentials: "include",

    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
