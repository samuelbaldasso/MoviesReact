import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endPoint = isLogin ? "/login" : "/register";

      // Se estiver logando, não precisa enviar o campo "name".
      const payload = isLogin ? { email, password } : { name, email, password };

      // Suponho que você deseja enviar o token apenas quando estiver logando.
      const config = isLogin
        ? {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        : {};

      const response = await axios.post(
        `http://localhost:3001${endPoint}`,
        payload,
        config
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert(isLogin ? "Sucesso no login!" : "Sucesso no cadastro!");
        history("/film");
      } else {
        alert("Usuário criado com sucesso!");
      }
    } catch (error) {
      alert("Erro ao autenticar.");
    }
  };

  return (
    <div className={"page"}>
      <div className={"rocket"}>
        <div className={"flex-start"}>
          <h1>RocketMovies</h1>
          <p>Aplicação para acompanhar tudo que assistir.</p>
        </div>


        <form onSubmit={handleSubmit}>
        <div className="h2">
          <h2>{isLogin ? "Faça seu login" : "Faça seu cadastro"}</h2>
        </div>
          <div>
            {!isLogin && (
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
            )}
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

          <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
        </form>
        <button
          className={"submit"}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Ir para Cadastro" : "Ir para Login"}
        </button>
      </div>

      <div className={"img"}>
        <img src={"/img.png"} alt={""} />
      </div>
    </div>
  );
}

export default AuthForm;
