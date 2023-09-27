import Header from "../components/Header/Header";
import axios from "axios";
import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {useUser} from "../UserContext";

const token = localStorage.getItem("token");
let userId;
try {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
    if(token){
        localStorage.setItem("userId", userId);
    }
} catch(err) {
    console.error("Error decoding the token", err);
}

function Film() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [nota, setNota] = useState("");
    const [films, setFilms] = useState([]);

    const {user, setUser} = useUser();

    useEffect(() => {
        async function getUser() {
            try {
                const res = await axios.get(`http://localhost:3001/user/${userId}`);
                setUser(res.data);
            } catch (e) {
                alert("Erro ao obter usuário.");
            }
        }

        async function fetchFilms() {
            try {
                const response = await axios.get('http://localhost:3001/film');
                setFilms(response.data);
            } catch (error) {
                alert('Erro ao obter filmes.');
            }
        }

        getUser();
        fetchFilms();
    }, [user, setUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/film', {
                title,
                description,
                nota,
                users_id: userId
            });

            setTitle("");
            setDescription("");
            setNota("");

            alert('Filme adicionado com sucesso!');

            // Refresque a lista de filmes após adicionar um
            const response = await axios.get('http://localhost:3001/film');
            setFilms(response.data);
        } catch (error) {
            alert('Erro ao adicionar filme.');
        }
    };

return (
        <div>
            <Header/>
        {/*    <form onSubmit={handleSubmit}>*/}
        {/*        <input*/}
        {/*            value={title}*/}
        {/*            onChange={e => setTitle(e.target.value)}*/}
        {/*            type="text"*/}
        {/*            placeholder="Título"*/}
        {/*            required*/}
        {/*        />*/}
        {/*        <textarea*/}
        {/*            value={description}*/}
        {/*            onChange={e => setDescription(e.target.value)}*/}
        {/*            placeholder="Descrição"*/}
        {/*            required*/}
        {/*        />*/}
        {/*        <input*/}
        {/*            value={nota}*/}
        {/*            onChange={e => setNota(e.target.value)}*/}
        {/*            type="number"*/}
        {/*            placeholder="Nota"*/}
        {/*            required*/}
        {/*        />*/}
        {/*        <button type="submit">Adicionar</button>*/}
        {/*    </form>*/}
        {/*    <h2>Filmes Adicionados</h2>*/}
        {/*    <ul>*/}
        {/*        {films.map(film => (*/}
        {/*            <li key={film.id}>{film.title} - {film.description} - {film.nota}</li>*/}
        {/*        ))}*/}
        {/*    </ul>*/}
        {/*</div>*/}
        </div>
    );
}

export default Film;
