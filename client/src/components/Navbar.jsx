import { Link } from "react-router-dom";

function Navbar(){
    return (
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/appointment">Schedule</Link></li>
        </ul>
      </nav>
    )
}


export default Navbar;