import React from 'react'
import Footer from '../components/Footer'
import '../assets/styles/emergency.css'
import immediatecare from '../assets/images/immediatecare.jpeg'
import complications from '../assets/images/complications.jpeg'
import relief from '../assets/images/relief.jpeg'
import equipment from '../assets/images/equipment.jpeg'
import available from '../assets/images/24.jpeg'
import happy from '../assets/images/happy.jpeg'
import AppointmentButton from '../components/AppointmentButton'

export default function Emergency() {
  return (
    <>
    {/* Emergency Services Banner */}
    <section className="emerserv-section text-start">
      <div className="container">
        <div className="row">
          <div className="col-md">
            <h1 className="display-5">
              24/7 Emergency <br /> Services
            </h1>
            <p className="lead fs-5 mt-2">
              When It Can’t Wait – Emergency Services Available.
            </p>
            <AppointmentButton/>
          </div>
        </div>
      </div>
    </section>

    {/* Section 01 */}
    <section className="se-section01">
      <div className="container">
        <h1 className="display-4">Loving hands, trusted care</h1>
        <h4 className="text-center fst-italic mb-5">
          <small>
            If your pet is experiencing dental pain, bleeding, or injury, call us
            immediately!{" "}
            <span className="text-primary fw-bold" style={{ fontStyle: "normal" }}>
              Our emergency dental care team is available 24/7
            </span>{" "}
            to provide prompt treatment and prevent further complications. Don't
            wait—your pet's comfort and health are our top priority.
          </small>
        </h4>
        <div className="row">
          {[
            {
              title: "Immediate Care",
              image: immediatecare,
              desc: "Emergency services can provide quick treatment for life-threatening conditions, such as severe trauma, bleeding, or poisoning, which could be fatal if not addressed promptly.",
            },
            {
              title: "Prevent Complications",
              image: complications,
              desc: "Timely intervention can prevent serious complications from conditions like infections, injuries, or undiagnosed illnesses that may worsen without urgent care.",
            },
            {
              title: "Pain Relief",
              image: relief,
              desc: "Emergency services offer immediate pain relief, helping to manage severe discomfort caused by dental issues, injuries, or other health concerns.",
            },
            {
              title: "Specialized Care and Equipment",
              image: equipment,
              desc: "Emergency clinics are equipped with the necessary tools, medications, and specialists to handle urgent situations that a regular vet visit may not cover.",
            },
            {
              title: "24/7 Availability",
              image: available,
              desc: "Pets can face emergencies at any time of day or night. Emergency services are available around the clock to ensure that your pet receives care whenever it’s needed.",
            },
            {
              title: "Peace of Mind for Pet Owners",
              image: happy,
              desc: "Knowing that emergency services are available gives pet owners peace of mind, knowing they can get their pets the care they need, even during unexpected situations.",
            },
          ].map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card-emergency mb-4 box-shadow">
                <img className="card-img-top" src={card.image} alt={card.title} />
                <div className="card-body-emergency">
                  <h5>{card.title}</h5>
                  <p>{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Map Section */}
    <section className="se-section03">
      <div className="container-fluid">
        <h1 className="text-center mt-5">
          We’re Here When You Need Us – Clinic Location
        </h1>
        <p className="text-center mb-5">
          Use the map below or contact us directly for directions and immediate assistance.
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5351543431702!2d121.05885012487329!3d14.625536385863763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b796aecb8763%3A0xaa026ea7350f82e7!2sTechnological%20Institute%20of%20the%20Philippines%20-%20Quezon%20City!5e0!3m2!1sen!2sph!4v1744766780223!5m2!1sen!2sph"
          width="100%"
          height="650px"
          style={{ border: 0, borderRadius: "20px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location Map"
        ></iframe>
      </div>
    </section>
    <Footer/>
  </>
  )
}
