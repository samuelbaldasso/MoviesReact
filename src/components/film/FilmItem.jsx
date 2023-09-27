import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useUser } from "../../UserContext";

export default function FilmItem() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [nota, setNota] = useState("");
  const [film, setFilm] = useState([]);
  const [tag, setTag] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function handleFilms() {
      try {
        const response = await axios.get("http://localhost:3001/film");
        setFilm(response.data);
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
  }, [user.id]);

  return (
    <div className="page-item">
      {film.map((f) => (
        <div className="item" key={f.id}>
            <h2>{f.title}</h2>
            <p>{f.nota.toString()}</p>

            <p>{f.description}</p>
        </div>
      ))}

      {tag.map((t) => (
        <div className="tag" key={tag.id}>
          <p>{t.name}</p>
        </div>
      ))}
    </div>
  );
}

// await axios.post("http://localhost:3001/film", {
//   title,
//   description,
//   nota,
//   users_id: user.id,
// });

// setTitle("");
// setDescription("");
// setNota("");
