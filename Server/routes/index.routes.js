import { Router } from "express";
import pool from "../DB.js";
const home = Router();
import Jwt from "jsonwebtoken";



const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization && authorization.split(" ")[1];

  if (!token) return res.status(401).json({status: res.statusCode, message: 'You are not authenticated'});

  Jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Access Denied, Token expires or incorrect", status: res.statusCode });
    } else {
      req.user = user;
      next();
    }
  });
};


home.get("/", validateToken, async (req, res) => {

  console.log(req.user.userId, 'asdasd')
  
  const [note] = await pool.query('SELECT * FROM links WHERE user_id = ?;', [req.user.userId]);

  res.status(201).json(note);
});


home.post("/",validateToken, async (req, res) => {
  const { title, description } = req.body;

  await pool.query('INSERT INTO links set ?;', [{ title, description, user_id: req.user.userId }])

  res.json({ title, description });
});


home.patch('/:id', async (req, res) => {
  const { id } = req.params

  const [[note]] = await pool.query('SELECT * FROM links WHERE id = ?', [id]);

  res.json({ title: note.title, description: note.description })

})


home.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const [data] = await pool.query("DELETE FROM links WHERE id = ?;", [id]);

  res.json(data);
});


home.post("/edit", async (req, res) => {
  const { title, description, id } = req.body;
  const data = { title, description };

  console.log(req.body);

  await pool.query("UPDATE links set ? WHERE id = ?", [data, id]);

  res.json({ message: "Nota Acualizada correctamente" });
});

export default home;
