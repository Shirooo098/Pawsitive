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
import AppointmentHistory from "./pages/user/AppointmentHistory";
import AddPet from "./pages/admin/AddPet";
import AdoptionForm from "./pages/user/AdoptionForm";
import UpdateAdoption from "./pages/admin/UpdateAdoption";
import PetBoarding from "./pages/PetBoarding";
import CheckUp from "./pages/CheckUp";
import DentalCare from "./pages/DentalCare";
import Emergency from "./pages/Emergency";
import Grooming from "./pages/Grooming";
import Nutritional from "./pages/Nutritional";
import Surgery from "./pages/Surgery";
import Vaccination from "./pages/Vaccination";
import About from "./pages/About";
import AdoptionHistory from "./pages/user/AdoptionHistory";
import AddAdmin from "./pages/admin/AddAdmin";

function App(){
    return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/petBoarding" element={<PetBoarding />} />
            <Route path="/checkUp" element={<CheckUp />} />
            <Route path="/dentalCare" element={<DentalCare />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/groom" element={<Grooming />} />
            <Route path="/nutritional" element={<Nutritional />} />
            <Route path="/surgery" element={<Surgery />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/profile" 
              element={<ProtectedRoute requiredType="user" element={<ProfilePage/>}/>} />
            <Route
              path="/appointment"
              element={<ProtectedRoute requiredType="user" element={<Appointment />}/>} />
            <Route
              path="/appointmentHistory"
              element={<ProtectedRoute requiredType="user" element={<AppointmentHistory />}/>} />
            <Route 
              path="/adoptionHistory" 
              element={<ProtectedRoute requiredType="user" element={<AdoptionHistory/>}/>} />
            <Route
              path="/adopt/:id"
              element={<ProtectedRoute requiredType="user" element={<AdoptionForm />}/>} />
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute requiredType="admin" element={<Dashboard/>}/>
              }/>
            <Route
              path="admin/addPet"
              element={
                <ProtectedRoute requiredType="admin" element={<AddPet/>}/>
              }/>
            <Route
              path="admin/addAdmin"
              element={
                <ProtectedRoute requiredType="admin" element={<AddAdmin/>}/>
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
              <Route
              path="admin/updateAdoption/:id"
              element={
                <ProtectedRoute requiredType="admin" element={<UpdateAdoption/>}/>
              }/>    
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    )
}

export default App;