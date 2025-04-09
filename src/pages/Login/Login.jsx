import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from "/logo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigator = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "guest") {
      setError("");
      setSuccess(true);
      setTimeout(() => {
        navigator("/createAnimalForm");
      }, 2000); // Redirect after 2 seconds
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
      setSuccess(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // Ensures vertical stacking of logo and form
        minHeight: "100vh",
        backgroundColor: "#D7E5FA",
      }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "128px", // Adjust size to fit nicely
          height: "64px",
          marginBottom: "20px", // Add space between logo and form
          cursor: "pointer",
        }}
        onClick={() => navigator("/")}
      />

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "320px",
          width: "100%",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#9333EA" }}>Inicio de Sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>¡Inicio de sesión exitoso!</p>}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #9333EA",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #9333EA",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#9333EA",
            color: "#ffffff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
