import React from 'react'
import Footer from '../components/Footer'
import '../assets/styles/vaccination.css'

export default function Vaccination() {
  return (
    <>
    <section className="hero-section-vacc text-center">
        <div className="container">
          <h1>Vaccination Services</h1>
          <p>Keep Your Furry Friends Happy and Healthy!</p>
          <a href="appointment.html" className="btn btn-primary">
            Schedule an Appointment
          </a>
        </div>
      </section>

      <section className="vax-section text-center">
        <h1>Why Vaccinate?</h1>
        <p className="intro">
          Pawsitive Care Veterinary Clinic prioritizes the health and well-being of your pets through comprehensive
          vaccination programs. Vaccinations are essential in preventing serious diseases, ensuring your furry friends
          lead healthy lives.
        </p>
        <div className="row">

          <div className="col-md-4">
            <div className="service-card">
              <img
                src="https://www.pumpkin.care/wp-content/uploads/2022/03/how-often-do-you-take-a-cat-to-the-vet-1.jpg"
                alt="Disease Prevention"
                className="service-image"
              />
              <h3>Disease Prevention</h3>
              <p>
                Vaccines protect animals from various infectious diseases, some of which can be severe or even fatal.
                Common diseases preventable by vaccines include rabies, parvovirus, distemper, and feline leukemia.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-card">
              <img
                src="https://i0.wp.com/bothellpethospital.com/wp-content/uploads/2015/03/vaccinate-dog.jpg?ssl=1"
                alt="Community Health"
                className="service-image"
              />
              <h3>Community Health</h3>
              <p>
                Vaccinating pets helps prevent the spread of zoonotic diseases that can be transmitted between animals
                and humans, contributing to public health safety.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-card">
              <img
                src="https://kogarahvet.com/wp-content/uploads/2023/09/vaccinations-for-pets.jpg"
                alt="Cost-Effectiveness"
                className="service-image"
              />
              <h3>Cost-Effectiveness</h3>
              <p>
                Preventing diseases through vaccination is often less expensive than treating them. Vaccinated pets are
                less likely to require costly treatments for illnesses that could have been prevented.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-card">
              <img
                src="https://cdn.petcloud.com.au/d/wp-content/uploads/2021/05/18132825/blog_image-1474941944.jpg"
                alt="Legal Requirements"
                className="service-image"
              />
              <h3>Legal Requirements</h3>
              <p>
                Many regions have laws mandating certain vaccinations, particularly rabies, which protects both pets
                and the community.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-card">
              <img
                src="https://cdn.royalcanin-weshare-online.io/xyKJwWoBaxEApS7LQRsb/v1/ec31h-cat-vaccination-schedule-kitten-being-vaccinated-at-vets"
                alt="Quality of Life"
                className="service-image"
              />
              <h3>Quality of Life</h3>
              <p>
                Vaccinated pets are less likely to suffer from severe health issues, leading to a longer, healthier
                life.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-card">
              <img
                src="https://images.7news.com.au/publication/C-2036103/a7ac1b52a449a94eee3c2548a2ad6313c1186d2b-16x9-x0y257w4938h2778.jpg"
                alt="Veterinary Guidance"
                className="service-image"
              />
              <h3>Veterinary Guidance</h3>
              <p>
                Regular vaccinations involve veterinary check-ups, which can lead to early detection of other health
                issues.
              </p>
            </div>
          </div>
        </div>
      </section>
    <Footer/>
    </>
  )
}
