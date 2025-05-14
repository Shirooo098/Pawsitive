import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { logout } from "../api/logout";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(setIsLoggedIn);
    navigate('/login');
  };

  const isAdmin = isLoggedIn && user?.type === 'admin';

  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/admin/manageAppointment">Appointment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/admin/addAdmin">Add Admin</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/admin/addPet">Pet</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-primary" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/about">About</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-primary"
                    href="#"
                    id="servicesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Services
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                    <li><Link className="dropdown-item" to="/petboarding">Pet Boarding</Link></li>
                    <li><Link className="dropdown-item" to="/checkUp">Routine Check-ups</Link></li>
                    <li><Link className="dropdown-item" to="/dentalCare">Dental Care</Link></li>
                    <li><Link className="dropdown-item" to="/emergency">Emergency Services</Link></li>
                    <li><Link className="dropdown-item" to="/groom">Grooming</Link></li>
                    <li><Link className="dropdown-item" to="/nutritional">Nutritional Counseling</Link></li>
                    <li><Link className="dropdown-item" to="/surgery">Surgery</Link></li>
                    <li><Link className="dropdown-item" to="/vaccination">Vaccinations</Link></li>
                  </ul>
                </li>
                {isLoggedIn ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle text-primary"
                        href="#"
                        id="servicesDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Profile
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                        <li><Link className="dropdown-item" to="/appointmentHistory">Appointment History</Link></li>
                        <li><Link className="dropdown-item" to="/adoptionHistory">Adoption History</Link></li>
                        <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link> </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link text-primary" to="/login">Login</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;