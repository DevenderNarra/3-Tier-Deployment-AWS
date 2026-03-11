const db = require("./config/db");

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    completed INTEGER DEFAULT 0
  )
`);

console.log("Table ready");