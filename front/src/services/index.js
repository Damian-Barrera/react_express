const registrarUsuario = async (datos) => {
  try {
    const res = await fetch("http://localhost:3000/api/registro", {
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
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(datos),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
