import "./style.css";
import StarRating from "../star/StarRating";
import { useNavigate } from "react-router";

export default function FilmItem({ film }) {
  const history = useNavigate();

  function navigate(){
    history(`/film/${film.id}`);
  }

  return (
    <div className="page-item" onClick={navigate}>
      <div className="item">
        <h2>{film.title}</h2>
        <StarRating rating={film.nota}/>
        <p>{film.description}</p>
      </div>
    </div>
  );
}

