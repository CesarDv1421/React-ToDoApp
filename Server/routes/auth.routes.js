import { Router } from "express";
import pool from "../DB.js";
import { body, validationResult } from "express-validator";
import encrypt from "../helpers/bcrypt.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", [

  body("email")
    .isEmail()
    .withMessage("Ingrese el formato correcto"),

  body("password")
    .isStrongPassword()
    .withMessage("La contraseña debe tener AL MENOS 8 caracteres, 1 caracter en mayuscula, 1 en minuscula, 1 numero y 1 caracter especial"),
  
  ], async (req, res) => {
    //Validar errores desde express-validator
    const errors = validationResult(req);
    console.log(errors.array())
    const error = errors.array()  
    if (!errors.isEmpty()) return res.status(400).json({ error : error[0].msg });
    
    try {

      const { name, email, password } = req.body;

      await pool.query("USE db;")
      
      const [userExist] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);

      //Validando si ya existe un usuario con el mismo email
      if (userExist.length !== 0) return res.status(404).json({ error: "El usuario ya existe" });
  
      //Encriptando contrasena en la base de datos
      const encriptedPassword = await encrypt.encryptPassword(res, password);
      await pool.query("INSERT INTO users SET ?", [{ name, email, password: encriptedPassword }]);

      const [user] = await pool.query("SELECT * FROM users WHERE email = ?",[email]);
      
      //Creando token
      const token = jwt.sign({ userId : user[0].id }, process.env.SECRET, { expiresIn: "10m" });
  
      return res.status(201).json({ token, userName: user[0].name });

     } catch(err) {
       res.status(500).json({error : err.message})
    }
  }
);

router.post("/signin",[
  
  body("email").isEmail().withMessage("Ingrese el formato correcto"),
  
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      /*const valores = req.body;
      const validaciones = errors.array();*/
    }
    
    try {
      
      const { email, password } = req.body;
      
      await pool.query("USE db;")

      //Validando que el email exista en la base de datos
      const [userExist] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (userExist.length > 0) {
      //Comparando contraseñas
      const passwordMatch = await encrypt.matchPassword(res, password, userExist[0].password);

      if (passwordMatch) {
        const userId = userExist[0].id;

        //Creando token
        const token = jwt.sign({ userId }, process.env.SECRET, {expiresIn: "30m"});

        //Enviando token, codigos y mensajes
        return res.status(201).json({ token, userName: userExist[0].name });
      }

      return res.status(400).json({ error: "Contrasena incorrecta" });
    }

    return res.status(400).json({ error: "El usuario no existe" });
    
  } catch(err) {
    res.status(500).json({error : err.message})
  }   
  }
);

export default router;
