import React from 'react'
import petBoarding from '../assets/images/pet-boarding.png';
import dogIcon from '../assets/images/dog-icon.png';
import toothbrush from '../assets/images/toothbrush.png';
import emergencyServices from '../assets/images/emergency-services.png';

const serviceData = [
  {
    name: 'Pet Boarding',
    image: petBoarding,
    id: 'pet-boarding'
  },
  {
    name: 'Dog Icon',
    image: dogIcon,
    id: 'dog-icon'
  },
  {
    name: 'Toothbrush',
    image: toothbrush,
    id: 'toothbrush'
  },
  {
    name: 'Emergency Services',
    image: emergencyServices,
    id: 'emergency-services'
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
            <div className="container text-center">
                <h2 className="section-title">Our Services</h2>
                <p className="section-subtext">Providing expert care for your pets with a variety of veterinary services!</p>
                <div className="row mb-4">
                    {serviceData.map((service, index) => (
                    <div key={index} className="col-md-3 d-flex">
                        <div className="service-card text-center p-3">
                        <h3>{service.name}</h3>
                        <img
                            src={service.image}
                            alt={service.name}
                            className="service-card-image"
                        />
                        <p>{`Description for ${service.name}.`}</p>
                        <a href={`#${service.id}`} className="btn btn-primary">
                            Learn More
                        </a>
                        </div>
                    </div>
                    ))}
                </div>
                {/* Additional service cards can be added here */}
            </div>
    </section>
  )
}
