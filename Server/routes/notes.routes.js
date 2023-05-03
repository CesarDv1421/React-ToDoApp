import { Router } from "express";
import pool from "../DB.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/notes", async (req, res) => {
  
  try {

    await pool.query("USE db;")

    const [note] = await pool.query("SELECT * FROM notes WHERE user_id = ?;", [req.user.userId]);
    res.status(200).json(note);
  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/notes",[

  body("title")
  
    .notEmpty()
    .withMessage("El titulo es requerido")

  ], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const valores = req.body;
      const validaciones = errors.array();
      return res.status(400).json({ errors: errors.array(), valores, validaciones });
    }

    try {
      const { title, description } = req.body;

      console.log(req.user)

      await pool.query("INSERT INTO notes set ?;", [{ title, description, user_id: req.user.userId }]);

      res.status(201).json({ title, description, userId: req.user.userId });
    } catch (err) {
      res.status(500).json({error : err.messages})
    }
  }
);

router.put("/notes/:id",[

    body("title")
      .notEmpty()
      .withMessage("El titulo es requerido")

], async (req, res) => {

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const valores = req.body;
      const validaciones = errors.array();
      return res.status(400).json({ errors: errors.array(), valores, validaciones });
    }

    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const data = { title, description };

      await pool.query("UPDATE notes set ? WHERE id = ?", [data, id]);

      res.status(200).json({ message: "Nota Acualizada correctamente" });
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [data] = await pool.query("DELETE FROM notes WHERE id = ?;", [id]);

    res.status(200).json(data);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
