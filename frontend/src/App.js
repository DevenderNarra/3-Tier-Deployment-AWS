import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(Array.isArray(res.data) ? res.data : []);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await API.post("/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    await API.put(`/todos/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Simple Todo App</h2>

        <div style={styles.inputRow}>
          <input
            style={styles.input}
            value={title}
            placeholder="Enter new todo..."
            onChange={e => setTitle(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addTodo}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {todos.length === 0 && (
            <p style={styles.empty}>No todos yet</p>
          )}

          {todos.map(t => (
            <li key={t.id} style={styles.item}>
              <span
                style={{
                  ...styles.title,
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "#888" : "#222"
                }}
                onClick={() => toggleTodo(t.id)}
              >
                {t.title}
              </span>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteTodo(t.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "18px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  addBtn: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "6px",
    background: "#f7f8fc",
    marginBottom: "8px",
  },
  title: {
    cursor: "pointer",
    fontSize: "14px",
  },
  deleteBtn: {
    border: "none",
    background: "#ff4d4f",
    color: "#fff",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: "12px",
  },
  empty: {
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
  }
};

export default App;