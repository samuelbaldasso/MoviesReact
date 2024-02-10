import "./style.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const history = useNavigate();
  const {user, setUser, setSearch} = useUser();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    history("/");
  }
  
  return (
    <div className={"page-header"}>
      <div className={"text"}>
        <h2 onClick={() => history("/film")}>RocketMovies</h2>
      </div>

      <input
        type={"text"}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Pesquisar pelo título"}
      />

      <div className={"links"}>
        <div>
          <a href={`/settings/${user.id}`}>
            <h3>{user.name || "Sem nome"}</h3>
          </a>
          <a href={"/"} onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </div>
  );
}
