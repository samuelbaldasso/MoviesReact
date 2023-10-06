import { useUser } from "../../UserContext";
import "./style.css";
import FilmItem from "../../components/film/FilmItem";
import { useNavigate } from "react-router";

function Film() {
  const history = useNavigate();
  const {filteredFilms, tag} = useUser();

  function navigate() {
    history(`/film/new`);
  }
 
  return(
     <div className={"page-film"}>
        <div className="texts">
          <h1>Meus filmes</h1>
          <button onClick={navigate}>
            <img src={"/Plus.svg"} alt={""} />
            Adicionar filme
          </button>
        </div>

        {Array.isArray(filteredFilms) && filteredFilms.map((e) => (
          <div className="films" key={e.id}>
            <FilmItem film={e} tags={tag} />
          </div>
        ))}
      </div>
  );
}

export default Film;
