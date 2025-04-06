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
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ): (
              <>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/appointment'>Schedule</Link></li>
              <li>
                {isLoggedIn ? (
                  <>
                    <Link to='/profile'>Profile</Link>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </>
                ): (  
                  <Link to='/login'>Login</Link>
                )}
              </li>
              </>
            )}
        </ul>
      </nav>
    )
}


export default Navbar;