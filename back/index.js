import express from "express";
import cors from "cors";
import pool from "./db_config.js";
import bcrypt from "bcrypt";

const PORT = 3000;
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", //modificar esta ruta en producción
  })
);

// app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/registro", async (req, res) => {
  const { nombre, apellido, email, password, password2 } = req.body;

  console.log(nombre, apellido, email, password, password2);

  // Validaciones

  if (!nombre || !apellido || !email || !password || !password2) {
    return res
      .status(400)
      .json({ mensaje: "Todos los campos son obligatorios" });
  }

  if (password !== password2) {
    return res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
  }
  try {
    const [existUser] = await pool.query(
      "SELECT id FROM all_users WHERE email = ?",
      [email]
    );
    if (existUser.length > 0) {
      return res.status(409).json({ mensaje: "El mail ya esta registrado" });
    }

    //Hasheando pass
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Guardando en base de datos

    const [rows] = await pool.query(
      "INSERT INTO all_users (nombre, apellido, email, password) VALUES (?,?,?,?)",
      [nombre, apellido, email, hashedPassword]
    );
    res.json({ mensaje: "usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificamos si el usuario existe
    const [user] = await pool.query("SELECT * FROM all_users WHERE email = ?", [
      email,
    ]);
    console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ mensaje: "usuario no encontrado" });
    }
    //comparamos las contraseñas
    const validPass = await bcrypt.compare(password, user[0].password);

      if(!validPass){
        return res.status(401).json({mensaje:"contraseña incorrecta"})
      }

      //Si todo esta bien
      res.json({mensaje: "login exitoso", usuario: user[0].nombre, email: user[0].email})

  } catch (error) {
    console.log(error)
    res.status(500).json({mensaje:"error en el servidor"})
  }
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
