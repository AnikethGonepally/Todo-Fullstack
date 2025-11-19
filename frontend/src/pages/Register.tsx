import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async () => {
    const res = await API.post("/auth/register", { name, email, password });

    if (res.data.error) return alert(res.data.error);

    alert("Registered! Now login.");
    nav("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /> <br /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> <br /><br />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
