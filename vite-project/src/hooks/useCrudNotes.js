import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCrudNotes = () => {
  
  const [notes, setNotes] = useState(null);

  const [errorMessage, setMessage] = useState({
    show : false,
    error : "",
    debounced : false
  });

  const [loading, setLoading] = useState({
    show: false,
    create: false,
    delete: false,
  });
  
  const navigate = useNavigate();

  const showNotes = async () => {
    try {

      setLoading((prevState) => ({...prevState, show: true}));

      const response = await fetch("http://localhost:3000/api/notes", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const jsonData = await response.json();

      if (response.status === 401) {
        return navigate("/auth/signin");
      }

      setLoading((prevState) => ({...prevState, show: false}));
      setNotes(jsonData);
    } catch (err) {
      setLoading((prevState) => ({...prevState, show: false}));
      console.log(err);
    }
  };

  const createNote = async (event) => {

    event.preventDefault();
    
    if (errorMessage.debounced) return;

    setLoading((prevState) => ({...prevState, create: true}));

    const formData = new FormData(event.target);
    const { title, description } = Object.fromEntries(formData);

    if (!title) {

      setMessage((prevState) => ({
        ...prevState,
        show: true,
        error: "El titulo es requerido",
      }));      

      setTimeout(() => {
        setMessage((prevState) => ({
          ...prevState,
          show: false,
          error: "",
          debounced: false,
        }));        
      }, 2350);

      setMessage((prevState) => ({...prevState, debounced: true}));      
      return setLoading((prevState) => ({...prevState, create: false}));
    }

    try {

      const response = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const newNote = await response.json();
      console.log(newNote);

      //Añadiendo los nuevos datos de la nota
      setNotes((prevUsers) => prevUsers ? [...prevUsers, newNote] : [newNote]);

      setLoading((prevState) => ({...prevState, create: false}));

      if (response.status === 401) {
        setLoading((prevState) => ({...prevState, create: false}));
        return navigate("/auth/signin");
      }
      showNotes();
    } catch (err) {

      setMessage((prevState) => ({
        ...prevState,
        show: true,
        error: "Ha ocurrido un error al crear la nota. Por favor, inténtelo de nuevo más tarde.",
      }));     

      setLoading((prevState) => ({...prevState, create: false}));

      setTimeout(() => {
        setMessage((prevState) => ({
          ...prevState,
          show: false,
          error: "",
          debounced: false
        }));
      }, 2350);
      setMessage((prevState) => ({...prevState, debounced: false}));   
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading((prevState) => ({...prevState, delete: id}));
      const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotes((prevUsers) => {
        return prevUsers.filter((note) => note.id !== id);
      });

      setLoading((prevState) => ({...prevState, delete: false}));
      if (response.status === 401) {
        console.log(await response.json());
        navigate("/auth/signin");
      }
    } catch (err) {
      setLoading((prevState) => ({...prevState, show: false}));
      console.log(err);
    }
  };

  return {
    notes,
    loading,
    errorMessage,
    showNotes,
    createNote,
    deleteNote,
  };
};

export default useCrudNotes;
