import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Appointment from "./pages/Appointment";
function App(){

    return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Appointment" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
    )
}

export default App;