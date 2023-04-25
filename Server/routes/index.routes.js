import { Router } from "express";
import pool from "../DB.js";
const home = Router();

home.get("/", async (req, res) => {
  
  try {
    const [note] = await pool.query('SELECT * FROM links WHERE user_id = ?;', [req.user.userId]);

  res.status(201).json(note);
  } catch(err) {
    console.log(err)
  }

});


home.post("/", async (req, res) => {
  const { title, description } = req.body;

  await pool.query('INSERT INTO links set ?;', [{ title, description, user_id: req.user.userId }])

  res.json({ title, description });
});


home.patch('/edit/:id', async (req, res) => {
  const { id } = req.params

  const [[note]] = await pool.query('SELECT * FROM links WHERE id = ?', [id]);

  res.json({ title: note.title, description: note.description })

})


home.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const [data] = await pool.query("DELETE FROM links WHERE id = ?;", [id]);

  res.json(data);
});


home.post("/edit/:id", async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body;

  const data = { title, description };

  await pool.query("UPDATE links set ? WHERE id = ?", [data, id]);

  res.json({ message: "Nota Acualizada correctamente" });
});

export default home;
