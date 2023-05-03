import NavBar from "../components/NavBar";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/HomeEdit.css";

function HomeEdit() {
  const [dataNote, setDataNote] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { id, notes } = location.state;

  useEffect(() => {
    //Mostrar datos previos de la nota
    const [note] = notes.filter((note) => note.id === id);
    setDataNote({ title: note.title, description: note.description });
  }, []);

  const handleChange = (event) => {
    //
    setDataNote({ ...dataNote, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataNote = new FormData(event.target);
    const { title, description } = Object.fromEntries(dataNote);

    if (!title) return console.log("El titulo es requerido");

    try {
      //Actualizar datos de la nota
      await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });
      navigate("/notes");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar>
        <div>
          <li>
            <h1 style={{ color: "white" }}>Actualizando nota de {localStorage.getItem('userName')}</h1>
          </li>
        </div>
        <li>
          <Link
            to="/auth/signin"
            onClick={() => {localStorage.removeItem("token");localStorage.removeItem("userName")}}
          >
          </Link>
        </li>
      </NavBar>

      <form className="editContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={dataNote.title}
          onChange={handleChange}
        />

        <textarea
          type="text"
          name="description"
          cols="20"
          rows="13"
          value={dataNote.description}
          onChange={handleChange}
        />

        <div className="inputsContainer">
          <button
            type="button"
            className="button-77 delete"
            onClick={() => navigate("/notes")}
          >
            Cancelar
          </button>

          <button type="submit" className="button-77" role="button">
            Actualizar Nota
          </button>
        </div>
      </form>
    </>
  );
}

export default HomeEdit;
