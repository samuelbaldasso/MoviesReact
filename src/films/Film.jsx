import Header from "../components/Header/Header";
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useUser } from "../UserContext";
import "./style.css";
import FilmItem from "../components/film/FilmItem";

function Film() {
  const { user, setUser } = useUser();
  
  const token = localStorage.getItem("token");
  let userId;
  try {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
    if (token) {
      localStorage.setItem("userId", userId);
    }
  } catch (err) {
    console.error("Error decoding the token", err);
  }

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`http://localhost:3001/user/${userId}`);
        setUser(res.data);
      } catch (e) {
        alert("Erro ao obter usuário.");
      }
    }

    getUser();
  }, [user, setUser, userId]);

  return (
    <div className={"page-films"}>
      <Header />
      <div className="line"></div>
      <div className="texts">
        <h1>Meus filmes</h1>
        <button><img src={"/Plus.svg"} alt={""}/>Adicionar filme</button>
      </div>

      <FilmItem/>
    </div>
  );
}

export default Film;
