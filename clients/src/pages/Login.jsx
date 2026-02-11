import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7000/api/auth/login", {
        email,
        password,
      });

      const { id, name, role, token } = response.data;

      // Stocker token et infos utilisateur
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ id, name, role }));

      // Redirection selon rôle
      if (role === "admin") navigate("/admin");
      else navigate("/profile");
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
