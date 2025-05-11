import { useEffect } from 'react';
import Footer from '../../components/Footer';
import Services from '../../components/Services';
import Hero from '../../components/Hero';
import Adoption from '../../components/Adoption';

import './HomePage.css';


export default function HomePage() {

return (
    <div>
        <Hero/>
        <Services/>
        <Adoption/>
        <Footer/>
    </div>
);
};