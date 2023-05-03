import { useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { BiLogOut } from "react-icons/bi";

//Componentes
import Notes from "../components/Notes";
import NavBar from "../components/NavBar";
import Message from "../components/errorMessage";

//Hooks
import useCrudNotes from "../hooks/useCrudNotes";

import "../css/formNotes.css";

function Dashboard() {

  const { notes, loading, errorMessage, showNotes, deleteNote, createNote } = useCrudNotes();

  useEffect(() => {
    showNotes();
  }, []);

  return (
    <>
      <NavBar>
        <div>
          <li>
            <h1 style={{ color: "white" }}>
              Bienvenido(a), {localStorage.getItem("userName")}
            </h1>
          </li>
        </div>
        <li>
          <Link
            to="/auth/signin"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
            }}
          >
            <BiLogOut />
          </Link>
        </li>
      </NavBar>

      <div className="dasContainer">
        <form className="formDB" onSubmit={createNote}>
          <span>Create a Note</span>

          <input type="text" name="title" placeholder="Titulo" />

          <textarea
            name="description"
            id=""
            cols="20"
            rows="8"
            placeholder="Descripcion"
          ></textarea>

          <button type="submit" className="bn9">
            
            {loading.create ? (

              <div className="loading-circle-container">
                <div className="loading-circle"></div>
              </div>

            ) : (

              <span>Create Note</span>
            )}

          </button>

          {errorMessage.show ? <Message message={errorMessage.error} /> : null}
        </form>

        <div className="notesContainer">

          {loading.show ? (

            <div className="loading-circle-container show">
              <div className="loading-circle"></div>
            </div>

          ) : (

           notes && notes.map(({ title, description, id, created_at }, index) => {
              return (
                <Notes
                  key={index}
                  id={id}
                  title={title}
                  description={description}
                  date={format(created_at)}
                >
                  <Link to={"/notes/edit"} state={{ notes, id }}>
                    <button className="button-77">Editar</button>
                  </Link>

                  <button
                    className="button-77 delete"
                    onClick={() => deleteNote(id)}
                    disabled={loading.delete[id]}
                  >
                    {loading.delete === id ? (
                      <div className="loading-circle-container deleteButtonContainer">
                        <div className="loading-circle deleteButton"></div>
                      </div>
                    ) : (
                      <>Eliminar</>
                    )}
                  </button>
                </Notes>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
