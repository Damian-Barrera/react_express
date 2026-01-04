import "dotenv/config";
import express from "express";
import cors from "cors";
import pool from "./db_config.js";
import bcrypt from "bcrypt";
import session from "express-session";
import path from "path";

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000; 

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


app.use(express.static("public")); //Desarrollo
// app.use(express.static(path.join(__dirname, "../front/dist"))); //Producción 



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
  })
);

// app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/configuracion", (req, res) => {
  res.sendFile("config.html", { root: "." }); //Usar el servidor 3000
});

app.post("/api/registro", async (req, res) => {
  const { nombre, apellido, email, password, password2 } = req.body;

  // console.log(nombre, apellido, email, password, password2);

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
    // console.log(user);
    if (user.length === 0) {
      return res.status(404).json({ mensaje: "usuario no encontrado" });
    }
    //comparamos las contraseñas
    const validPass = await bcrypt.compare(password, user[0].password);

    if (!validPass) {
      return res.status(401).json({ mensaje: "contraseña incorrecta" });
    }

    //Si todo esta bien
    req.session.user = {
      id: user[0].id,
      is_admin: user[0].is_admin,
    };
    res.json({ mensaje: "login exitoso", usuario: user[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "error en el servidor" });
  }
});

app.get("/api/me", async (req, res) => {
  if (!req.session.user) {
    return res.json({ usuario: null });
  }

  try {
    const id = req.session.user.id;

    const [rows] = await pool.query(
      "SELECT id, nombre, apellido, email,mensaje, telefono , direccion, is_admin FROM all_users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.json({ usuario: null });
    }

    return res.json({ usuario: rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: "error en el servidor" });
  }
});

//Cerrando la sesion

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ mensaje: "no se pudo cerrar la sesión" });
    }
    res.clearCookie("connect.sid");
    res.json({ mensaje: "sesión cerrada correctamente" });
  });
});

//Actualizar perfil

app.put("/api/edit", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ mensaje: "No autorizado" });
  }
  const { nombre, apellido, email, direccion, mensaje, telefono } = req.body;
  const id = req.session.user.id;

  try {
    let query =
      "UPDATE all_users SET nombre = ?, apellido = ?, email = ?, direccion = ?, mensaje = ?, telefono = ? WHERE id = ?";
    let valores = [nombre, apellido, email, direccion, mensaje, telefono, id];
    await pool.query(query, valores);
    res.json({ mensaje: "Se actualizo el perfil correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "error al intentar actualizar el perfil" });
  }
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../front/dist/index.html"));
// });

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
