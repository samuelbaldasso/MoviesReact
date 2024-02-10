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

  // useEffect(() => {
  //   async function getAllTags() {
  //     try {
  //       const res = await axios.get(`http://localhost:3001/tag/tag`);
  //       setTag(res.data);
  //     } catch (e) {
  //       alert("Erro ao buscar tags.");
  //     }
  //   }

  //   getAllTags();
  // }, [setTag]);

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

  // async function deleteTag(tagId) {
  //   try {
  //     await axios.delete(`http://localhost:3001/tag/tag/${tagId}`);
  //     setTag(prev => prev.filter(t => t.id !== tagId));
  //   } catch (e) {
  //     alert("Erro ao deletar tag.");
  //   }
  // }

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

        {/* <div className="markups">
          <h3>Marcadores</h3>
        </div>

        <div className="markup-group">
          {tag.map((t) => (
            <div className="markup" key={t.id}>
              <span key={t.id}>{t.name}</span>
              <p className="close" onClick={() => deleteTag(t.id)}>
                X
              </p>
            </div>
          ))}
          
        </div> */}

        <div className="buttons">
          {/* <button onClick={navigateTo}>Excluir filme</button> */}
          <button type={"submit"}>Salvar alterações</button>
        </div>
        </form>
        </div>
      </div>
    </>
  );
}
