import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const useEditNote = () => {
  const [dataNote, setDataNote] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { id, notes } = location.state;
  

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

  return {  dataNote, setDataNote,handleChange, handleSubmit }
};

export default useEditNote;
