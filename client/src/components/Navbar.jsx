import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { logout } from "../api/logout";

function Navbar(){
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await logout(setIsLoggedIn);
    navigate('/login');
  }


    return (
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li>
              {isLoggedIn ? (
                <Link to="/profile">Profile</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li><Link to="/appointment">Schedule</Link></li>
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
        </ul>
      </nav>
    )
}


export default Navbar;