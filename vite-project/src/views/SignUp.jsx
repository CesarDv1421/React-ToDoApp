import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

function SignUp({ auth }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { name, email, password } = Object.fromEntries(formData);

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const { token, status, message } = await response.json();

    localStorage.setItem("token", token);
    
    if (status === 200 
      && token !== undefined && token !== null && token !== "undefined" && token !== "" ) {
      navigate("/auth/signin", { replace: true });
      auth(true)
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <form onSubmit={handleSubmit} className="authForm">
          <h1>Registrarse</h1>
          <input type="text" name="name" placeholder="Nombre" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />
          <p>Ya tienes Cuenta? <Link to='/auth/signin'>Inicia Sesion</Link></p>
          <button type="submit" className="button-77" style={{padding : '16px'}}>
            Registrate
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
