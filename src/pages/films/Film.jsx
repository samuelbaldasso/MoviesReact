import { useUser } from "../../UserContext";
import "./style.css";
import FilmItem from "../../components/film/FilmItem";
import { useNavigate } from "react-router";

function Film() {
  const history = useNavigate();
  const { filteredFilms } = useUser();

  function navigate() {
    history(`/film/new`);
  }

  return (
    <div className={"page-film"}>
      <div className="texts">
        <h1>Meus filmes</h1>
        <button onClick={navigate}>
          <img src={"/Plus.svg"} alt={""} />
          Adicionar filme
        </button>
      </div>

      <div className="filmData">
        {Array.isArray(filteredFilms) && filteredFilms.length > 0 ? (
          filteredFilms.map((e) => (
            <div className="films" key={e.id}>
              <FilmItem film={e} key={e.id}/>
            </div>
          ))
        ) : (
          <div className="empty-list">
            <p>Sem filmes encontrados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Film;
