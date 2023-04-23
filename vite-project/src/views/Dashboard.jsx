import { useEffect, useState, useContext } from "react";
import Notes from "../components/Notes";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import "../css/formNotes.css";

function Dashboard() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    fetcher();
  }, [localStorage.getItem("token")]);

  const handleSubmit = async (event) => {
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
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:3000/home/${id}`, { method: "DELETE" });
    const filteredNotes = users.filter((note) => note.id !== id);
    setUsers(filteredNotes);
  };

  // const patchNote = async (id) => {
  //   await fetch(`http://localhost:3000/home/${id}`, { method: "PATCH" });
  // }

  console.log(users);

  return (
    <>
      <NavBar />

      <div className="dasContainer">
        <form className="formDB" onSubmit={handleSubmit}>
          <span>Create a Note</span>

          <input type="text" name="title" />

          <textarea name="description" id="" cols="20" rows="8"></textarea>

          <button type="submit" className="bn9">
            <span>Create Note</span>
          </button>
        </form>

        <div className="notesContainer">
          {users &&
            users.map(({ title, description, id }, index) => {
              return (
                <Notes
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  date="hoy xd"
                >
                  <Link to="/home/edit" state={{ title, description, id }}>
                    <button className="button-77" role="button">
                      Editar
                    </button>
                  </Link>

                  {/* <button className="button-77" onClick={()=> patchNote(id)}>
                    Editar
                  </button> */}

                  <button
                    className="button-77 delete"
                    role="button"
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
