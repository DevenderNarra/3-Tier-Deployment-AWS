const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get tasks
router.get("/", auth, (req, res) => {
  db.all(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, rows) => res.json(rows)
  );
});

// Create task
router.post("/", auth, (req, res) => {
  const { title } = req.body;
  db.run(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [title, req.user.id],
    () => res.json({ msg: "Task created" })
  );
});

// Update task
router.put("/:id", auth, (req, res) => {
  const { status } = req.body;
  db.run(
    "UPDATE tasks SET status=? WHERE id=? AND user_id=?",
    [status, req.params.id, req.user.id],
    () => res.json({ msg: "Updated" })
  );
});

// Delete task
router.delete("/:id", auth, (req, res) => {
  db.run(
    "DELETE FROM tasks WHERE id=? AND user_id=?",
    [req.params.id, req.user.id],
    () => res.json({ msg: "Deleted" })
  );
});

module.exports = router;