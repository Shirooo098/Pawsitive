import { useEffect } from 'react';
import Footer from '../../components/Footer';
import Services from '../../components/Services';
import Hero from '../../components/Hero';
import Adoption from '../../components/Adoption';
import '../../assets/styles//Homepage.css';

export default function HomePage() {
  useEffect(() => {
    // Carousel and scroll logic can be implemented here
}, []);

return (
    <div>
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg shadow-sm sticky-top">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link text-primary" href="homepage.html">Home</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-primary" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="petboarding.html">Pet Boarding</a></li>
                                <li><a className="dropdown-item" href="checkups.html">Routine Check-ups</a></li>
                                <li><a className="dropdown-item" href="#dental-care">Dental Care</a></li>
                                <li><a className="dropdown-item" href="#emergency">Emergency Services</a></li>
                                <li><a className="dropdown-item" href="#grooming">Grooming</a></li>
                                <li><a className="dropdown-item" href="#nutrition">Nutritional Counseling</a></li>
                                <li><a className="dropdown-item" href="#surgery">Surgery</a></li>
                                <li><a className="dropdown-item" href="#vaccinations">Vaccinations</a></li>
                            </ul>
                        </li>
                        <li className="nav-item"><a className="nav-link text-primary" href="about.html">About</a></li>
                        <li className="nav-item"><a className="nav-link" href="login.html">Login</a></li>
                    </ul>
                </div>
            </div>
        </nav>

        <Hero/>
        <Services/>
        <Adoption/>
        <Footer/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </div>
);
};