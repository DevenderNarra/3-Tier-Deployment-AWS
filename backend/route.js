const express = require("express");
const db = require("./config/db"); // mysql2 pool (promise)
const router = express.Router();

// Get all todos
router.get("/todos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM todos ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Add todo
router.post("/todos", async (req, res) => {
  try {
    const { title } = req.body;
    await db.query(
      "INSERT INTO todos (title, completed) VALUES (?, false)",
      [title]
    );
    res.json({ message: "Added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// Toggle complete
router.put("/todos/:id", async (req, res) => {
  try {
    await db.query(
      "UPDATE todos SET completed = NOT completed WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete todo
router.delete("/todos/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM todos WHERE id = ?",
      [req.params.id]
    );
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;