import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

function SignUp() {
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
    
    console.log(message)

    if (status === 201) navigate("/home", { replace: true });
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
          <input type="submit" value="Registrate" />
        </form>
      </div>
    </>
  );
}

export default SignUp;
