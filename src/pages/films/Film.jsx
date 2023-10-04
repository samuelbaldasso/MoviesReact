import Header from "../../components/header/Header";
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useUser } from "../../UserContext";
import "./style.css";
import FilmItem from "../../components/film/FilmItem";
import Line from "../../components/line/Line";
import { useNavigate } from "react-router";

function Film() {
  const { user, setUser, film, setFilm, tag, setTag } = useUser();
  const history = useNavigate();

  function navigate(){
    history(`/film/new`);
  }

  const token = localStorage.getItem("token");
  let userId;
  try {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
    if (token) {
      localStorage.setItem("userId", userId);
    }
  } catch (err) {
    console.error("Erro ao decodificar o token.", err);
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

    async function handleFilms() {
      try {
        const response = await axios.get("http://localhost:3001/film");
        const filteredData = response.data.filter((film) => film.users_id === userId);
        setFilm(filteredData);
      } catch (error) {
        alert("Erro ao adicionar filme.");
      }
    }

    async function handleTags() {
      try {
        const response = await axios.get("http://localhost:3001/tag");
        setTag(response.data);
      } catch (error) {
        alert("Erro ao adicionar tag.");
      }
    }

    handleFilms();
    handleTags();
    getUser();
  }, [user, setUser, userId, setFilm, setTag]);

  return (
    <>
      <Header />
      <Line />
      <div className={"page-film"}>
        <div className="texts">
          <h1>Meus filmes</h1>
          <button onClick={navigate}>
            <img src={"/Plus.svg"} alt={""} />
            Adicionar filme
          </button>
        </div>

        {film.map((e) => (
          <div className="films" key={e.id}>
            <FilmItem film={e} tags={tag} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Film;
