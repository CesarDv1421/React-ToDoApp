import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/HomeEdit.css'

function HomeEdit() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: state.title,
    description: state.description,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("http://localhost:3000/home/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, id: state.id }),
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
          cols='20'
          rows='9'
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
