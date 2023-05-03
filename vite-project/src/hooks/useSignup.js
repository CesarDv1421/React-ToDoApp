import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useSignup = (auth) => {

  const [errorMessage, setErrorMessage] = useState({
    show: false, //Muestra el mensaje de error
    error: "", //Añade el mensaje de error
    debounced: false, //Evita recargas innecesarias cada vez que se muestra el mensaje de error
  });
  
  const navigate = useNavigate();

  const validateAndShow = () => {
    setErrorMessage((prevState) => ({ ...prevState, show: true })); //Muestra el mensaje
    setTimeout(() => {
      setErrorMessage((prevState) => ({
        ...prevState,
        show: false,
        error: "",
        debounced: false,
      }));
    }, 2350);
    setErrorMessage((prevState) => ({ ...prevState, debounced: true })); //Evita mas cambios
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errorMessage.debounced) return;

    const formData = new FormData(event.target);
    const { name, email, password } = Object.fromEntries(formData);

    if (!name && !email && !password) {
      validateAndShow();
      return setErrorMessage((prevState) => ({ ...prevState, error: "Ingrese el nombre, email y contraseña" }));
    }

    if (!email && !password) {
      validateAndShow();
      return setErrorMessage((prevState) => ({ ...prevState, error: "Ingrese el email y la contraseña" }));
    }

    if (!name && !password) {
      validateAndShow();
      return setErrorMessage((prevState) => ({ ...prevState, error: "Ingrese el nombre y la contraseña" }));
    }

    if (!password) {
      validateAndShow();
      return setErrorMessage((prevState) => ({ ...prevState, error: "Ingrese la contraseña" }));
    }

    if (!email) {
      validateAndShow();
      return setErrorMessage((prevState) => ({ ...prevState, error: "Ingrese el email" }));
    }

    if (!name) {
      validateAndShow();
      return setErrorMessage((prevState) => ({ ...prevState, error: "Ingrese el nombre" }));
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const { token, userName, error } = await response.json();

      console.log(userName)

      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);

      console.log(error)

      if (
        response.status === 201 &&
        token !== undefined && token !== null && token !== "undefined" && token !== "") {
        auth(true);
        navigate("/notes", { replace: true });
      }

      if (error) {
        console.log(error)
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        
         setErrorMessage((prevState) => ({
          ...prevState,
          show: true,
          error: error,
        }));

        setTimeout(() => {
          setErrorMessage((prevState) => ({
            ...prevState,
            show: false,
            error: "",
            debounced: false,
          }));
        }, 2350);
        setErrorMessage((prevState) => ({ ...prevState, debounced: true }));
      }
    } catch (err) {

      console.log(err);
      
      setErrorMessage((prevState) => ({
        ...prevState,
        show: true,
        error:
          "Ha ocurrido un error en el registro. Por favor, inténtelo de nuevo más tarde.",
      }));

      setTimeout(() => {
        setErrorMessage((prevState) => ({
          ...prevState,
          show: false,
          error: "",
          debounced: false,
        }));
      }, 2350);
      setErrorMessage((prevState) => ({ ...prevState, debounced: false }));
    }
  };

  return { errorMessage, handleSubmit }
};

export default useSignup;
