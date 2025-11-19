import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

interface Todo {
  id: string;
  title: string;
}

function Todos() {
  const nav = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login");
    }
  }, []);

  const load = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  const add = async () => {
    if (!title.trim()) return;
    await API.post("/todos", { title });
    setTitle("");
    load();
  };

  const del = async (id: string) => {
    await API.delete(`/todos/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Your Todos</h2>

      <input
        placeholder="Add todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={add}>Add</button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            {t.title}
            <button onClick={() => del(t.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          nav("/login");
        }}
        style={{ marginTop: 20 }}
      >
        Logout
      </button>
    </div>
  );
}

export default Todos;
