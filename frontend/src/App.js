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
    if (!title) return;
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
    <div style={{ padding: 20 }}>
      <h2>Simple Todo App</h2>

      <input
        value={title}
        placeholder="New Todo"
        onChange={e=>setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={()=>toggleTodo(t.id)}
            >
              {t.title}
            </span>
            <button onClick={()=>deleteTodo(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;