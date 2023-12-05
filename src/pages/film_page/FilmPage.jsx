import Header from "../../components/header/Header";
import Film from "../films/Film";
import Line from "../../components/line/Line";
import { useUser } from "../../UserContext";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./style.css";

export default function FilmPage() {
  const { user, setUser, setFilteredFilms, setFilm, setTag, search } = useUser();

  // Novo estado para armazenar os filmes obtidos do servidor
  const [serverFilms, setServerFilms] = useState([]);

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
    async function handleFilms() {
      try {
        const response = await axios.get(
          "https://movies-backend-nodejs-2.onrender.com/film/film"
        );
        const localId = localStorage.getItem("userId");
        const filteredData = response.data.filter(
          (film) => film.users_id === localId
        );
        setServerFilms(filteredData); // Atualiza os filmes do servidor
      } catch (error) {
        alert("Erro ao adicionar filme.");
      }
    }

    handleFilms();
  }, []); // Depende apenas do userId

  useEffect(() => {
    let filteredDataFilms = serverFilms;

    if (search) {
      filteredDataFilms = serverFilms.filter((f) =>
        f.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilm(filteredDataFilms);
  }, [search, serverFilms, setFilm]); // Agora depende de search e serverFilms

  useEffect(() => {
    async function getUser() {
      try {
        const localId = localStorage.getItem("userId");
        const res = await axios.get(
          `https://movies-backend-nodejs-2.onrender.com/user/user/${localId}`
        );
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
  }, [user, setUser, setTag, setFilteredFilms]);

  return (
    <>
      <Header />
      <Line />
      <Film />
    </>
  );
}
