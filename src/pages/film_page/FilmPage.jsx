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

  useEffect(() => {
    function createFilter() {
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
    }
    createFilter();
  }, []);
  useEffect(() => {
    async function handleFilms(e) {
      try {
        const response = await axios.get("https://movies-backend-nodejs-2.onrender.com/film/film");
        const localId = localStorage.getItem("userId");
        const filteredData = response.data.filter(
          (film) => film.users_id === localId
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
  }, [setUser, setFilm, film, setFilteredFilms, filteredFilms, search]);

  useEffect(() => {
    async function getUser() {
      const localId = localStorage.getItem("userId");
      try {
        const res = await axios.get(`https://movies-backend-nodejs-2.onrender.com/user/user/${localId}`);
        setUser(res.data);
      } catch (e) {
        alert("Erro ao obter usuário.");
      }
    }

    // async function handleTags() {
    //   try {
    //     const response = await axios.get("http://localhost:3001/tag/tag");
    //     setTag(response.data);
    //   } catch (error) {
    //     alert("Erro ao adicionar tag.");
    //   }
    // }

    // handleTags();
    getUser();
  }, [user, setUser, setFilm, setTag, setFilteredFilms]);

  return (
    <>
      <Header />
      <Line />
      <Film />
    </>
  );
}
