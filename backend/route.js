const express = require("express");
const db = require("./config/db");
const router = express.Router();

// Get all todos
router.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    res.json(rows);
  });
});

// Add todo
router.post("/todos", (req, res) => {
  const { title } = req.body;
  db.run(
    "INSERT INTO todos (title) VALUES (?)",
    [title],
    () => res.json({ message: "Added" })
  );
});

// Toggle complete
router.put("/todos/:id", (req, res) => {
  db.run(
    "UPDATE todos SET completed = NOT completed WHERE id = ?",
    [req.params.id],
    () => res.json({ message: "Updated" })
  );
});

// Delete todo
router.delete("/todos/:id", (req, res) => {
  db.run(
    "DELETE FROM todos WHERE id = ?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
});

module.exports = router;