import notFoundImage from "../../public/NotFound.png";
import NavBar from '../components/NavBar'

function NotFound() {
  const style = {
    display: "flex",
    alignItems: "center",
    height: "80vh"
  };

  const imgStyle = {
    margin: "auto",
    width: "500px",
  };

  return (
    <>
    <NavBar/>
      <div style={style}>
        <img src={notFoundImage} style={imgStyle} alt="Imagen no encontrada" />
      </div>
    </>
  );
}

export default NotFound;
