import Header from "../../components/header/Header";
import Film from "../films/Film";
import Line from "../../components/line/Line";
import { useUser } from "../../UserContext";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./style.css";

export default function FilmPage() {
  const {
    user,
    setUser,
    film,
    setFilm,
    setFilteredFilms,
    filteredFilms,
    setTag,
    search,
  } = useUser();

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
    async function handleFilms(e) {
      try {
        const response = await axios.get("http://localhost:3001/film/film");
        const filteredData = response.data.filter(
          (film) => film.users_id === userId
        );
        setFilm(filteredData);
        if (search) {
          const filteredDataFilms = film.filter((f) =>
            f.title.toLowerCase().includes(search.toLowerCase())
          );
          setFilteredFilms(filteredDataFilms);
        } else {
          setFilteredFilms(film);
        }
      } catch (error) {
        alert("Erro ao adicionar filme.");
      }
    }

    handleFilms();
  }, [setUser, setFilm, film, setFilteredFilms, userId, filteredFilms, search]);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(`http://localhost:3001/user/user/${userId}`);
        setUser(res.data);
      } catch (e) {
        alert("Erro ao obter usuário.");
      }
    }
    getUser();
  }, [user, setUser, userId, setFilm, setTag, setFilteredFilms]);

  return (
    <>
      <Header />
      <Line />
      <Film />
    </>
  );
}
