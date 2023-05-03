//Libraries
import { Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

//Components
import Dashboard from "./views/Dashboard.jsx";
import SignIn from "./views/SignIn.jsx";
import SignUp from "./views/SignUp.jsx";
import NotFound from "./views/NotFound.jsx";
import HomeEdit from "./views/HomeEdit.jsx";
import LandingPage from "./views/LandingPage.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));

  return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/signup" element={<SignUp auth={setIsAuthenticated} />} />
        <Route path="/auth/signin" element={<SignIn auth={setIsAuthenticated} />} />
        <Route path="/notes" element={ isAuthenticated ? <Dashboard /> : <Navigate to="/auth/signin" /> } />
        <Route path="/notes/edit" element={ isAuthenticated ? <HomeEdit /> : <Navigate to="/auth/signin" /> } />
      </Routes>
  );
}

export default App;
