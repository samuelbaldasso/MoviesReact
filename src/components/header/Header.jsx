import "./style.css"
import {useNavigate} from "react-router-dom";
import {useUser} from "../../UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header(){
    const { user, setUser } = useUser();
    const history = useNavigate();
    const [avatar, setAvatar] = useState();

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem("userId");
        history("/");
    }

    useEffect(() => {
      async function getAvatar(){
        try{
          const res = await axios.get('http://localhost:3001/lastUpload');
          setAvatar(res.data.imageUrl);
          setUser(prevState => ({...prevState, avatar: avatar}));
        }
        catch (e){
          alert("Erro 500 - Servidor. Por favor, tente novamente.")
        }
      }

      getAvatar();
    }, [setUser, avatar])

    return (
        <div className={"page-header"}>
            <div className={"text"}>
                <h2>RocketMovies</h2>
            </div>

            <input type={"text"} placeholder={"Pesquisar pelo título"}/>

            <div className={"links"}>
                <div>
                    <a href={`/settings/${user.id}`}>
                        <h3>{user.name || "Sem nome"}</h3>
                    </a>
                    <a href={"/"} onClick={handleLogout}>Sair</a>
                </div>
                <img src={avatar ? avatar : "/img.png"} alt={""}/>
            </div>
        </div>
    );
}