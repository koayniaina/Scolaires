import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();


    if (password !== passwordConfirmed) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
   
      localStorage.setItem("token" , response.data.token);

      navigate("/profile");
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={passwordConfirmed}
            onChange={(e) => setPasswordConfirmed(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
