import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Appointment from "./pages/user/Appointment";
import AuthProvider from "./hooks/AuthContext";
import ProfilePage from "./pages/user/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ManageAppointment from "./pages/admin/ManageAppointment";
import UpdateAppointment from "./pages/admin/UpdateAppointment";
import History from "./pages/user/History";
import Consultation from "./pages/user/Consultation";

function App(){
    return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/profile" 
              element={<ProtectedRoute requiredType="user" element={<ProfilePage/>}/>} />
            <Route
              path="/appointment"
              element={<ProtectedRoute requiredType="user" element={<Appointment />}/>} />
            <Route
              path="/history"
              element={<ProtectedRoute requiredType="user" element={<History />}/>} />
            <Route
              path="/consult"
              element={<ProtectedRoute requiredType="user" element={<Consultation />}/>} />
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute requiredType="admin" element={<Dashboard/>}/>
              }/>
            <Route
              path="admin/manageAppointment"
              element={
                <ProtectedRoute requiredType="admin" element={<ManageAppointment/>}/>
              }/>
            <Route
              path="admin/updateAppointment/:id"
              element={
                <ProtectedRoute requiredType="admin" element={<UpdateAppointment/>}/>
              }/>   
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    )
}

export default App;