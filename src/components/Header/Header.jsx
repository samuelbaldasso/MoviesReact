import "./style.css"
import {useNavigate} from "react-router-dom";
import {useUser} from "../../UserContext";

export default function Header(){
    const { user } = useUser();
    const history = useNavigate();
    const id = localStorage.getItem("userId");
    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem("userId");
        history("/");
        console.log(user);
    }

    return (
        <div className={"page-header"}>
            <div className={"text"}>
                <h2>RocketMovies</h2>
            </div>

            <input type={"text"} placeholder={"Pesquisar pelo título"}/>

            <div className={"links"}>
                <div>
                    <a href={`/settings/${id}`}>
                        <h3>{user.name || "Sem nome"}</h3>
                    </a>
                    <a href={"/"} onClick={handleLogout}>Sair</a>
                </div>
                <img src={user.avatar || "/img.png"} alt={""}/>
            </div>
        </div>
    );
}