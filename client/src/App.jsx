import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App(){
    return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/RegisterPage" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default App;