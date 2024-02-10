import { useNavigate } from "react-router";
import Header from "../../components/header/Header";
import Line from "../../components/line/Line";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";

export default function NewFilm() {
  const [title, setTitle] = useState("");
  const [nota, setNota] = useState("");
  // const [tagName, setTagName] = useState("");
  const [description, setDescription] = useState("");

  const { setFilm, user } = useUser();
  const history = useNavigate();

  function navigateTo() {
    history("/film");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {  
      const res = await axios.post(`http://localhost:3001/film/film`, {
        title,
        nota,
        description,
        users_id: user.id,
      });
      setFilm((prev) => ([...prev, res.data]));
      navigateTo();
    } catch (e) {
      alert("Erro ao adicionar filme.");
    }
  }

  return (
    <>
      <Header />
      <Line />

      <div className="page-new">
        <div className="description">
          <a href={"/film"} onClick={navigateTo}>
            <img src={"/ArrowLeft.svg"} alt={""} />
          </a>
          <h3>Voltar</h3>
        </div>

        <div className="texts-new">
          <h1>Novo filme</h1>
        </div>

        <div className="form-div">
        <form method="post" className="form" onSubmit={handleSubmit}>
          <div className="data-title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Título"
              required
            />
            <input
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              type="number"
              min="0"
              max="10"
              placeholder="Sua nota (de 0 a 10)"
              required
            />
          </div>

          <div className="textarea">
            <textarea
              className="description-field"
              value={description}
              draggable={false}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Observações"
              required
            />
          </div>

        <div className="buttons">
          <button type={"submit"}>Salvar alterações</button>
        </div>
        </form>
        </div>
      </div>
    </>
  );
}
