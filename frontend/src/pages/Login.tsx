import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });

    if (res.data.error) return alert(res.data.error);

    localStorage.setItem("token", res.data.token);
    nav("/todos");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
