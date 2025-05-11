import React from 'react';
import { Link } from 'react-router-dom';
import petBoarding from '../assets/images/pet-boarding.png';
import dogIcon from '../assets/images/dog-icon.png';
import toothbrush from '../assets/images/toothbrush.png';
import emergencyServices from '../assets/images/emergency-services.png';
import petGrooming from '../assets/images/pet-grooming.png';
import petFood from '../assets/images/pet-food.png';
import scalpel from '../assets/images/scalpel.png';
import vaccine from '../assets/images/vaccine.png';
import '../assets/styles/Homepage.css';

const serviceData = [
  {
    name: 'Pet Boarding',
    image: petBoarding,
    id: '/petboarding',
    description: 'Safe and comfortable pet boarding while you\'re away.',
  },
  {
    name: 'Routine Check-ups',
    image: dogIcon,
    id: '/checkUp',
    description: 'Comprehensive health assessments for your pets.',
  },
  {
    name: 'Dental Care',
    image: toothbrush,
    id: '/dentalCare',
    description: 'Keep your pet’s teeth and gums healthy with expert dental care.',
  },
  {
    name: 'Emergency Services',
    image: emergencyServices,
    id: '/emergency',
    description: 'Immediate care for urgent pet health issues.',
  },
  {
    name: 'Grooming',
    image: petGrooming,
    id: '/groom',
    description: 'Professional grooming services to keep your pet clean and stylish.',
  },
  {
    name: 'Nutritional Counseling',
    image: petFood,
    id: '/nutritional',
    description: 'Expert advice on the best diet for your pet’s health.',
  },
  {
    name: 'Surgery',
    image: scalpel,
    id: '/surgery',
    description: 'Safe and professional surgical procedures for your pet’s needs.',
  },
  {
    name: 'Vaccinations',
    image: vaccine,
    id: '/vaccination',
    description: 'Protect your pet from diseases with up-to-date vaccinations.',
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section-home">
      <div className="container text-center">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtext">
          Providing expert care for your pets with a variety of veterinary services!
        </p>

        {/* Divide into rows of 4 */}
        <div className="row mb-4">
          {serviceData.slice(0, 4).map((service, index) => (
            <div key={index} className="col-md-3 d-flex">
              <div className="service-card-home text-center p-3">
                <h3>{service.name}</h3>
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-card-home-image"
                />
                <p>{service.description}</p>
                <a href={service.id} className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4">
          {serviceData.slice(4).map((service, index) => (
            <div key={index + 4} className="col-md-3 d-flex">
              <div className="service-card-home text-center p-3">
                <h3>{service.name}</h3>
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-card-home-image"
                />
                <p>{service.description}</p>
                <Link to={service.id} className="btn btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
