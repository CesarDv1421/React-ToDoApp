import { Link } from "react-router-dom";
import notFoundImage from "../../public/NotFound.png";
import NavBar from "../components/NavBar";

function NotFound() {
  const style = {
    display: "flex",
    alignItems: "center",
    height: "80vh",
  };

  const imgStyle = {
    margin: "auto",
    width: "500px",
  };

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
      <div style={style}>
        <img src={notFoundImage} style={imgStyle} alt="Imagen no encontrada" />
      </div>
    </>
  );
}

export default NotFound;
