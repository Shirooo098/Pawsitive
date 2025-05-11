import React from 'react'
import Footer from '../components/Footer'
import '../assets/styles/about.css'

export default function About() {
  return (
    <>
            <section className="about-section mt-0 py-3">
      <h2 className="section-title text-center">About Pawsitive Care</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              <div className="about-card">
                <img
                  src="https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2020/07/thumb_720_450_dreamstime_m_156181857.jpg"
                  alt="vision"
                  className="about-image"
                />
                <h3>Vision</h3>
                <p>
                  To create a compassionate community where every pet receives exceptional care, fostering a future where animals and their families thrive together.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="about-card">
                <img
                  src="https://khpet.com/cdn/shop/articles/introducing-a-dog-to-a-cat-home_800x800.jpg?v=1593020063"
                  alt="Haircuts and Styling"
                  className="about-image"
                />
                <h3>Mission</h3>
                <p>
                  To provide compassionate and innovative veterinary care that enhances the health and well-being of pets and fosters lasting relationships with their families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Values Section */}
      <section className="values-section mt-0 py-3">
        <h2 className="section-title text-center">Our Values</h2>
        <div className="container mt-5">
          <div className="values-container">
            <div className="row">
              {[
                { icon: "❤️", title: "Compassion", desc: "We treat every pet with love and respect, ensuring their comfort and well-being." },
                { icon: "🛡️", title: "Integrity", desc: "We are honest and transparent in all our services, building trust with our clients." },
                { icon: "🌟", title: "Excellence", desc: "We strive for the highest standards in veterinary care." },
                { icon: "🤝", title: "Teamwork", desc: "We work together to ensure the best outcomes for our patients." },
                { icon: "📚", title: "Education", desc: "We believe in educating pet owners about their pets' health and well-being." },
                { icon: "🏡", title: "Community", desc: "We are dedicated to improving animal lives and supporting local welfare." },
              ].map((value, index) => (
                <div key={index} className="col-md-4">
                  <div className="value-item text-center">
                    <span className="icon">{value.icon}</span>
                    <h3>{value.title}</h3>
                    <p>{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-section mt-0 py-3">
        <h2 className="section-title text-center">Meet Our Team!</h2>
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            {[
              "John David Beloncio",
              "Ciarliz Danielle Ann Fabro",
              "Mary Filio",
              "Geri Louise Hernia",
              "Jan Carlo Rentoy",
              "Bryan Erickson Soriano"
            ].map((name, index) => (
              <div key={index} className="col-md-2 member-container">
                <img
                  src="https://i.pinimg.com/564x/d3/99/32/d3993281bc95861f8851227af31fd701.jpg"
                  alt={name.split(" ")[0]}
                  className="member-image"
                />
                <h4>{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    <Footer/>
    </>
  )
}
