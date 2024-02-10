import { useNavigate, useParams } from "react-router";
import "./style.css";
import Header from "../../components/header/Header";
import { useUser } from "../../UserContext";
import Line from "../../components/line/Line";
import { useEffect } from "react";
import axios from "axios";
import dateFormat from "../../utils/Date";
import StarRating from "../../components/star/StarRating";

export default function FilmDescription() {
  const history = useNavigate();
  const { user, film, setFilm } = useUser();
  const { id } = useParams();

  function navigateTo() {
    setFilm([]);
    history("/film");
    console.log(user);
  }

  useEffect(() => {
    async function handleFilm() {
      try {
        const response = await axios.get(`http://localhost:3001/film/film/${id}`);
        setFilm(response.data);
      } catch (error) {
        alert("Erro ao adicionar filme.");
      }
    }
    handleFilm();
  }, [setFilm, id]);

  return (
    <>
      <Header />
      <Line />
      <div className={"page-description"}>
        <div className="description">
          <a href={"/film"} onClick={navigateTo}>
            <img src={"/ArrowLeft.svg"} alt={""} />
          </a>
          <h3>Voltar</h3>
        </div>

        <div className="data">
          <h1 key={film.id}>{film.title}</h1>
          <StarRating rating={film.nota} />
        </div>

        <div className="image">
          <img src={user.avatar} alt={""} />
          <p>Por {user.name}</p>
          <div className="hour">
            <img src="/hour.svg" alt="" />
            <p>{dateFormat(film.created_at)[0]} às {dateFormat(film.created_at)[1]}</p>
          </div>
        </div>

        {/* <div className="tag-container">
          {tag.map((tag) => (
            <div className="tags" key={tag.id}>
              <span>{tag.name}</span>
            </div>
          ))}
        </div> */}

        <div className="text-desc" key={film.id}>
          <p>{film.description}</p>
        </div>
      </div>
    </>
  );
}
