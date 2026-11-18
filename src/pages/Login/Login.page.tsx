import Styles from "./Login.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext.context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setErro("");

    if (!email.trim() || !password.trim()) {
      setErro("Por favor, preencha o usuário e a senha.");
      return;
    }

    const USUARIO_PADRAO = "admin@hubpet.com";
    const SENHA_PADRAO = "123456";

    if (email === USUARIO_PADRAO && password === SENHA_PADRAO) {
      localStorage.setItem("@HubPet:userLogged", JSON.stringify({ email }));

      login(email, password, "Atendente");

      navigate("/hub-pet");
    } else {
      setErro("Usuário ou senha incorretos. Tente novamente.");
    }
  }

  return (
    <main className={Styles.login}>
      <form onSubmit={handleLogin} className={Styles.loginForm}>
        <h1>HubPet - Login</h1>

        {erro && (
          <div
            style={{
              color: "#991b1b",
              backgroundColor: "#fef2f2",
              padding: "0.75rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              textAlign: "center",
              border: "1px solid #fecaca",
            }}
          >
            {erro}
          </div>
        )}

        <div className={Styles.loginInput}>
          <h3>Usuário</h3>
          <input
            type="text"
            placeholder="admin@hubpet.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={Styles.loginInput}>
          <h3>Senha</h3>
          <input
            type="password"
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={Styles.loginButton}>
          <button type="submit">Entrar</button>
          <a
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            Esqueci minha senha
          </a>
        </div>
      </form>
    </main>
  );
}
