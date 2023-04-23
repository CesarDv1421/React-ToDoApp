import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import SignIn from "./views/SignIn.jsx";
import SignUp from "./views/SignUp.jsx";
import NotFound from "./views/NotFound.jsx";
import HomeEdit from "./views/HomeEdit.jsx";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await fetch("http://localhost:3000/home", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      console.log(await response.json(), response)
  
      if (response.status === 201) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }

    };
    fetchAuth();
    console.log('Esta autenticado? :',isAuthenticated)
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/home" element={isAuthenticated ? <Dashboard/> : <Navigate to="/auth/signin" />} />
      <Route path="/home/edit" element={isAuthenticated ? <HomeEdit/> : <Navigate to="/auth/signin" />} />
    </Routes>
  );
}

export default App;
