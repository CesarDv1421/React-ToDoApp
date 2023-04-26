import { useEffect, useState, useContext } from "react";
import Notes from "../components/Notes";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../css/formNotes.css";
import { format } from "timeago.js";

function Dashboard() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  const fetcher = async () => {
    const response = await fetch("http://localhost:3000/home", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const jsonData = await response.json();

    setUsers(jsonData);

    if (jsonData.status === 401) return navigate("/auth/signin");
  };

  useEffect(() => {
    fetcher();
  }, []);

  const createNote = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, description } = Object.fromEntries(formData);

    const response = await fetch("http://localhost:3000/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const newNote = await response.json();

    //Añadiendo los nuevos datos de la nota
    setUsers((prevUsers) => {
      return prevUsers ? [...prevUsers, newNote] : [newNote];
    });
    fetcher();
  };

  const deleteNote = async (id) => {
    console.log(id, "dentro de deletenote");
    await fetch(`http://localhost:3000/home/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setUsers((prevUsers) => {
      return prevUsers.filter((note) => note.id !== id);
    });
  };

  return (
    <>
      <NavBar />

      <div className="dasContainer">
        <form className="formDB" onSubmit={createNote}>
          <span>Create a Note</span>

          <input type="text" name="title" />

          <textarea name="description" id="" cols="20" rows="8"></textarea>

          <button type="submit" className="bn9">
            <span>Create Note</span>
          </button>
        </form>

        <div className="notesContainer">
          {users &&
            users.map(({ title, description, id, created_at }, index) => {
              return (
                <Notes
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  date={format(created_at)}
                >
                  <Link to={`/home/edit/${id}`}>
                    <button className="button-77">
                      Editar
                    </button>
                  </Link>

                  <button
                    className="button-77 delete"
                    onClick={() => deleteNote(id)}
                  >
                    Eliminar
                  </button>
                </Notes>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
