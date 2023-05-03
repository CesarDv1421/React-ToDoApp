import { Link } from "react-router-dom";
//Componentes
import NavBar from "../components/NavBar";
import Message from "../components/errorMessage";
//Hooks
import useSignup from "../hooks/useSignup";

function SignUp({ auth }) {
  
  const  { errorMessage, handleSubmit } = useSignup(auth)

  return (
    <>
      <NavBar>
        <div>
          <li>
            <Link to="/auth/signin">Iniciar Sesion</Link>
          </li>
          <li>
            <Link to="/auth/signup">Registrate</Link>
          </li>
        </div>
      </NavBar>
      <div>
        <form onSubmit={handleSubmit} className="authForm">
          <h1>Registrarse</h1>
          <input type="text" name="name" placeholder="Nombre" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />

          {errorMessage.show ? (

            <Message message={errorMessage.error} />

            ) : (
              
            <p className="registred">
              ¿Ya tienes Cuenta? {" "}
              <Link
                to="/auth/signin"
                style={{ color: "blue", borderBottom: "solid 2px blue" }}
              >
                Inicia Sesion
              </Link>
            </p>
          )}

          <button
            type="submit"
            className="button-77"
            style={{ padding: "16px" }}
          >
            Registrate
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
