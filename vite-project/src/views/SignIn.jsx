import { Link } from "react-router-dom";
import "../css/Signin.css";
//Componentes
import NavBar from "../components/NavBar";
import Message from "../components/errorMessage";
//Hooks
import useSignin from "../hooks/useSignin";

function SignIn({ auth }) {
  
  const { errorMessage, handleSubmit } = useSignin(auth);

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
          <h1>Iniciar Sesion</h1>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />
          {errorMessage.show ? (
            <Message message={errorMessage.error} />
          ) : (
            <p className="registred">
              ¿No estas registrado? {" "}
              <Link
                to="/auth/signup"
                style={{ color: "blue", borderBottom: "solid 2px blue" }}
              >
                Registrate
              </Link>
            </p>
          )}
          <button
            type="submit"
            className="button-77"
            style={{ padding: "16px" }}
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </>
  );
}
export default SignIn;
