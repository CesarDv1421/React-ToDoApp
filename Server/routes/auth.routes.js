import { Router } from "express";
import pool from "../DB.js";
import { body, validationResult } from "express-validator";
import encrypt from "../helpers/bcrypt.js";
import Jwt from "jsonwebtoken";

const auth = Router();

auth.post("/signup",[

  body('name', 'Rellene el campo requerido')
      .not().isEmpty(),

  body('email', 'ingrese el formato correcto')
      .not().isEmpty()
      .isEmail(),

  body('password', 'Ingrese una contraseña')
      .not().isEmpty()
      .isLength({ min: 8 })

], async (req, res) => {

  //Validar errores desde express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    const valores = req.body;
    const validaciones = errors.array();

    return res.status(400).json({ errors: errors.array(), valores, validaciones });
  }


  const { name, email, password } = req.body;

  const [userExist] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
  //Validando si ya existe un usuario con el mismo email
  if (userExist.length !== 0) return res.status(404).json({ message: "El usuario ya existe" });

  //Encriptando contrasena en la base de datos
  const encriptedPassword = await encrypt.encryptPassword(password);
  await pool.query("INSERT INTO users SET ?", [{ name, email, password: encriptedPassword }]);

  //Creando token
  const token = Jwt.sign({ email }, process.env.SECRET, { expiresIn: "10m" });

  return res.status(200).json({ token, status: res.statusCode ,message: res.statusMessage });
});

auth.post("/signin",[

  body('email', 'ingrese el formato correcto')
      .not().isEmpty()
      .exists()
      .isEmail(),

  body('password', 'Ingrese una contraseña')
      .not().isEmpty()
      .exists()
      .isLength({ min: 8 })

], async (req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
      /*const valores = req.body;
      const validaciones = errors.array();*/
    }

  const { email, password } = req.body;

  //Validando que el email exista en la base de datos
  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  
  if (user.length > 0) {
    //Comparando contraseñas
    const passwordMatch = await encrypt.matchPassword(password, user[0].password);
    if (passwordMatch) {
      const userId = user[0].id;

      //Creando token
      const token = Jwt.sign({ userId }, process.env.SECRET, {expiresIn: "24h"});

      //Enviando json con el token y datos del usuario
      return res.status(201).json({token, user, status : res.statusCode, message : res.statusMessage});
    }

    return res.status(400).json({ message: "Contrasena incorrecta" });
  }

  return res.status(400).json({ message: "El usuario no existe" });
});

export default auth;
