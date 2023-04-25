import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../css/Signin.css";

function SignIn({auth}) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const { status, token, errors,  message } = await response.json();

    localStorage.setItem("token", token);

    console.log(token, status, errors, message);

    if (status === 201 && token !== undefined && token !== null && token !== "undefined" && token !== "" ) {
      navigate("/home", { replace: true });
      auth(true)
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <form onSubmit={handleSubmit} className="authForm">
          <h1>Iniciar Sesion</h1>

          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" value="Iniciar Sesion" />
        </form>
      </div>
    </>
  );
}
export default SignIn;
