import { Link } from "react-router-dom";

function Navbar(){
    return (
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Register">Register</Link></li>
            <li><Link to="/Appointment">Schedule</Link></li>
        </ul>
      </nav>
    )
}


export default Navbar;