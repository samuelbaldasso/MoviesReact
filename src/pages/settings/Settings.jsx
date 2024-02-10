import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";

export default function Settings() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [name, setName] = useState("");

  function navigateTo() {
    navigate("/film");
  }

  async function putUser(e) {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        actualPassword, // sending both passwords to server
        password
      };

      const response = await axios.put(
        `http://localhost:3001/user/user/${id}`,
        payload
      );

      if (response.status === 200) {
        alert("Usuário atualizado com sucesso!");
        navigateTo();
      } else {
        alert("Erro ao atualizar usuário.");
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar usuário.");
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`http://localhost:3001/user/user/${id}`);
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (e) {
        alert("Erro ao obter usuário.");
      }
    }
    getUser();
  }, [id, setUser]);

  return (
    <div className={"page-settings"}>
      <div className={"back"}>
        <a href={"/film"} onClick={navigateTo}>
          <img src={"/ArrowLeft.svg"} alt={""} />
        </a>
        <h3>Voltar</h3>
      </div>

        <form onSubmit={putUser} className="form-settings">
          <div className={"name"}>
            <img src={"/Nome.svg"} alt={""} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nome"
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
              value={actualPassword}
              type="password"
              onChange={(e) => setActualPassword(e.target.value)}
              placeholder="Senha atual"
            />
          </div>

          <div className={"senha"}>
            <img src={"/Senha.svg"} alt={""} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Nova senha"
            />
          </div>

          <button type="submit">Salvar</button>
        </form>
      </div>
  );
}