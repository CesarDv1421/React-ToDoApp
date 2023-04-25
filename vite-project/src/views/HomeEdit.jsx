import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/HomeEdit.css";

function HomeEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    //Mostrar datos previos de la nota
    const showNote = async () => {
      const response = await fetch(`http://localhost:3000/home/edit/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { title, description } = await response.json();

      setFormData({ title, description });
    };
    showNote();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, description } = Object.fromEntries(formData);

    //Actualizar datos de la nota
    await fetch(`http://localhost:3000/home/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });
    navigate("/home");
  };

  return (
    <>
      <NavBar />

      <form className="editContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          type="text"
          name="description"
          cols="20"
          rows="13"
          value={formData.description}
          onChange={handleChange}
        />

        <div className="inputsContainer">
          <button
            type="button"
            className="button-77 delete"
            onClick={() => navigate("/home")}
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
