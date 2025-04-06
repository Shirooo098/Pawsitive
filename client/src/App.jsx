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

function App(){
    return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/appointment"
              element={<ProtectedRoute element={<Appointment />} />}
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredType="admin" element={<Dashboard/>}/>
              }>
            
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    )
}

export default App;