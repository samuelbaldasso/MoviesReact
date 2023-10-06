import "./style.css";
import StarRating from "../star/StarRating";
import { useNavigate } from "react-router";

export default function FilmItem({ film, tags }) {
  const history = useNavigate();

  function navigate(){
    history(`/film/${film.id}`);
  }

  return (
    <div className="page-item" onClick={navigate}>
      <div className="item" key={film.id}>
        <h2>{film.title}</h2>
        <StarRating rating={film.nota} key={film.id}/>
        <p>{film.description}</p>
      </div>

      {/* <div className="tag-container">
        {tags.map((tag) => (
          <div className="tags" key={tag.id}>
            <span>{tag.name}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
}

