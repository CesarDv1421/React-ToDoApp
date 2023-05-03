import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignin = (auth) => {
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
        error: "", /// Se resetea el mensaje de error despues de 2350ms
        debounced: false,
      }));
    }, 2350);
    setErrorMessage((prevState) => ({ ...prevState, debounced: true })); //Evita mas cambios
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (errorMessage.debounced) return;

    setErrorMessage((prevState) => ({ ...prevState, error: "" })); //Setea el mensaje de error para evitar mostrar mensajes no correspondientes al error

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email && !password) {
      validateAndShow();
      return setErrorMessage((prevState) => ({
        ...prevState, //Muestra el mensaje de error
        error: "Ingrese un email y una contraseña",
      }));
    }
    if (!email) {
      validateAndShow();
      return setErrorMessage((prevState) => ({
        ...prevState,//Muestra el mensaje de error
        error: "Ingrese un email",
      }));
    }
    if (!password) {
      validateAndShow();
      return setErrorMessage((prevState) => ({
        ...prevState,//Muestra el mensaje de error
        error: "Ingrese una contraseña",
      }));
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const { token, userName, error } = await response.json();

      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);

      if (error) {
        
        localStorage.removeItem("token");
        localStorage.removeItem("userName");

        setErrorMessage((prevState) => ({
          ...prevState,
          show: true, //Muestra el mensaje de error segun lo que responde el Backend
          error: error,
        }));

        setTimeout(() => {
          setErrorMessage((prevState) => ({
            ...prevState,
            show: false,
            error: "",//Resetea el mensaje de error
            debounced: false,
          }));
        }, 2350);
        setErrorMessage((prevState) => ({ ...prevState, debounced: true }));
      }

      if (
        response.status === 201 &&
        token !== undefined && token !== null && token !== "undefined" && token !== "") {
        auth(true);
        navigate("/notes");
      }
    } catch (err) {
      console.log(err);

      setErrorMessage((prevState) => ({
        ...prevState,
        show: true,
        error: //Muestra el mensaje de error
          "Ha ocurrido un error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.",
      }));

      setTimeout(() => {
        setErrorMessage((prevState) => ({
          ...prevState,
          show: false,
          error: "", //Resetea el mensaje de error
          debounced: false,
        }));
      }, 2350);
      setErrorMessage((prevState) => ({ ...prevState, debounced: false }));
    }
  };

  return { errorMessage, handleSubmit };
};

export default useSignin;
