import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endPoint = "/register";

      // Se estiver logando, não precisa enviar o campo "name".
      const payload = { name, email, password };

      const response = await axios.post(
        `http://localhost:3001/auth/${endPoint}`,
        payload
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Sucesso no cadastro!");

        history("/film");
      }
    } catch (error) {
      alert("Erro ao registrar.");
    }
  };

  return (
    <div className={"page"}>
      <div className={"rocket"}>
        <div className={"flex-start"}>
          <h1>RocketMovies</h1>
          <p>Aplicação para acompanhar tudo que assistir.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-register">
          <div className="h2">
            <h2>{"Faça seu cadastro"}</h2>
          </div>

          <div className={"name"}>
            <img src={"/Nome.svg"} alt={""} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nome"
              required
            />
          </div>

          <div className={"email"}>
            <img src={"/E-mail.svg"} alt={""} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              required
            />
          </div>

          <div className={"senha"}>
            <img src={"/Senha.svg"} alt={""} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Senha"
              required
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
        <button className={"submit"} onClick={() => history("/")} type="submit">
          Ir para Login
        </button>
      </div>

      <div className={"img"}>
        <img src={"/img.png"} alt={""} />
      </div>
    </div>
  );
}

export default RegisterForm;
