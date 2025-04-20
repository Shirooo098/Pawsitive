import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { logout } from "../api/logout";

function Navbar(){
  const { isLoggedIn, setIsLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout(setIsLoggedIn);
    navigate('/login');
  }

  const isAdmin = isLoggedIn && user?.type === 'admin';

    return (
      <nav>
        <ul>
            {isAdmin ? (
              <>
                <li><Link to='admin/dashboard'>Dashboard</Link></li>
                <li><Link to='admin/manageAppointment'>Appointment</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ): (
              <>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/appointment'>Schedule</Link></li>
                {isLoggedIn ? (
                  <>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/consult'>Consultation</Link></li>
                    <button onClick={handleLogout}>Logout</button>
                  </>
                ): (  
                  <Link to='/login'>Login</Link>
                )}
              </>
            )}
        </ul>
      </nav>
    )
}


export default Navbar;