import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";

export default function Settings() {
  const history = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [actualPassword, setActualPassword] = useState("");
  const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState("");

  function navigateTo() {
    history("/film");
  }

  async function putUser(e) {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        actualPassword, // sending both passwords to server
        password,
      };

      const response = await axios.put(
        `https://movies-backend-nodejs-2.onrender.com/user/user/${id}`,
        payload
      );

      if (response.status === 200) {
        alert("Usuário atualizado com sucesso!");
        navigateTo();
      } else {
        alert("Erro ao atualizar usuário.");
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar usuário.");
    }
  }

  useEffect(() => {
    async function getAvatar() {
      try {
        const res = await axios.get("https://movies-backend-nodejs-2.onrender.com/lastUpload");
        if (res.data.imageUrl) {
          setUser((prevState) => ({ ...prevState, avatar: res.data.imageUrl }));
        }
      } catch (e) {
        alert("Erro 500 - Servidor. Por favor, tente novamente.");
      }
    }
  
    async function getUser() {
      try {
        const res = await axios.get(`https://movies-backend-nodejs-2.onrender.com/user/user/${id}`);
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (e) {
        alert("Erro ao obter usuário.");
      }
    }
    getUser();
    getAvatar();
  }, [id, setUser]);
  
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file); // 'image' is the field name; adjust it according to your server's expected field name

      // Assuming your server is set up to accept POST requests at the "/upload" endpoint
      axios
        .post("https://movies-backend-nodejs-2.onrender.com/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle successful upload
          console.log("File uploaded successfully:", response.data.imageUrl);
          if (response.data && response.data.imageUrl) {
            setUser((prevState) => ({
              ...prevState,
              avatar: response.data.imageUrl,
            }));
          }
        })
        .catch((error) => {
          // Handle upload error
          console.error("File upload error:", error);
        });
    }
  }

  return (
    <div className={"page-settings"}>
      <div className={"back"}>
        <a href={"/film"} onClick={navigateTo}>
          <img src={"/ArrowLeft.svg"} alt={""} />
        </a>
        <h3>Voltar</h3>
      </div>

      <div className={"profile"}>
        <img src={user.avatar ? user.avatar : "/img.png"} alt={""} />
        <div className={"camera"}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden-input"
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <img src={"/Câmera.svg"} alt="Upload Avatar" />
          </label>
        </div>

        <form onSubmit={putUser} className="form-settings">
          <div className={"name"}>
            <img src={"/Nome.svg"} alt={""} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Nome"
            />
          </div>

          <div className={"email"}>
            <img src={"/E-mail.svg"} alt={""} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              required
            />
          </div>

          <div className={"senha"}>
            <img src={"/Senha.svg"} alt={""} />
            <input
              value={actualPassword}
              type="password"
              onChange={(e) => setActualPassword(e.target.value)}
              placeholder="Senha atual"
            />
          </div>

          <div className={"senha"}>
            <img src={"/Senha.svg"} alt={""} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Nova senha"
            />
          </div>

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}
