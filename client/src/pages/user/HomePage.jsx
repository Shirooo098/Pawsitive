import { useEffect } from 'react';
import Footer from '../../components/Footer';
import Services from '../../components/Services';
import Hero from '../../components/Hero';
import Adoption from '../../components/Adoption';
<<<<<<< HEAD
import './HomePage.css';
=======
>>>>>>> local

export default function HomePage() {
  useEffect(() => {
    // Carousel and scroll logic can be implemented here
}, []);

return (
    <div>
        <Hero/>
        <Services/>
        <Adoption/>
        <Footer/>
    </div>
);
};