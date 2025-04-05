import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function Navbar(){
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
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