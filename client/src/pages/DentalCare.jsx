import React from 'react'
import Footer from '../components/Footer'
import '../assets/styles/dentalcare.css'

export default function DentalCare() {
  return (
    <>
    {/* Dental Care Section */}
      <section className="dental-section text-start">
        <div className="container">
          <div className="row">
            <div className="col-md">
              <h1 className="display-1">Dental Care</h1>
              <p className="lead">
                Providing the best dental care tips and products for your furry
                friends.
              </p>
              <a href="appointment.html" className="btn btn-primary">
                Book an Appointment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dental Care Importance Section */}
      <section className="dc-section01 text-center">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h2 className="section-title text-center">
              Why Pet Dental Care is Important?
            </h2>
            <p className="section-subtext text-center">
              Just like humans, pets need dental care for overall health. Poor
              hygiene can lead to plaque, gum disease, and infections, causing
              pain, eating difficulties, and affecting organs like the heart and
              kidneys. Bad breath, swollen gums, drooling, or trouble chewing
              may signal dental issues needing prompt attention.
            </p>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="container">
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="service-card">
                <h3>Dental Health and Pet Well-being</h3>
                <p>
                  Good dental health is essential for your pet's overall
                  wellness, as bacteria from the mouth can enter the bloodstream
                  and affect major organs like the heart, liver, and kidneys,
                  helping your pet stay active, eat comfortably, and live a
                  longer, happier life.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <h3>Common dental issues in pets</h3>
                <p>
                  Pets can develop dental issues such as plaque and tartar
                  buildup, which can lead to gingivitis and periodontal disease,
                  causing pain, tooth loss, and bad breath, making it hard for
                  them to eat or enjoy daily activities.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card">
                <h3>Signs that your pet might need dental care</h3>
                <p>
                  Warning signs that your pet might need dental care include bad
                  breath, red or swollen gums, drooling, pawing at the mouth, or
                  reluctance to eat, which may indicate dental discomfort or
                  infection and require a vet's evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Dental Procedures and Prices */}
      <section className="dc-section02 text-center">
        <div className="row align-items-center">
          <div className="left-column col-md-6 mt-5">
            <h2 className="section-title">Pet Dental Procedures and Prices</h2>
            <div className="table-responsive">
              <table className="table table-bordered text-center mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Dental Procedure</th>
                    <th>Description</th>
                    <th>Estimated Cost (PHP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dental Cleaning (Basic)</td>
                    <td>
                      Routine scaling and polishing under anesthesia to remove
                      plaque and tartar.
                    </td>
                    <td>₱2,500 – ₱5,000</td>
                  </tr>
                  <tr>
                    <td>Tooth Extraction (Simple)</td>
                    <td>Removal of a damaged or decayed tooth.</td>
                    <td>₱1,000 – ₱3,000 per tooth</td>
                  </tr>
                  <tr>
                    <td>Full Mouth X-ray</td>
                    <td>
                      Dental x-rays to assess below the gum line for hidden
                      issues.
                    </td>
                    <td>₱1,500 – ₱3,000</td>
                  </tr>
                  <tr>
                    <td>Gingivitis Treatment</td>
                    <td>Treatment for inflamed gums caused by plaque buildup.</td>
                    <td>₱1,000 – ₱2,000</td>
                  </tr>
                  <tr>
                    <td>Advanced Dental Cleaning</td>
                    <td>
                      Deep cleaning for pets with moderate to severe dental
                      issues.
                    </td>
                    <td>₱5,000 – ₱8,000</td>
                  </tr>
                  <tr>
                    <td>Oral Surgery</td>
                    <td>
                      Surgery for complicated dental issues like abscesses or
                      jaw fractures.
                    </td>
                    <td>₱8,000 – ₱15,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="right-column col-md-6 mt-5">
            <h2 className="section-title text-center p-5">
              Healthy Teeth, Happy Pets – Without Breaking the Bank!
            </h2>
            <p className="text-justify">
              Every pet deserves a bright smile and fresh breath without costly
              treatments. Our affordable dental services help prevent gum
              disease and keep your furry friend healthy and happy. Invest in
              their well-being today—because a healthy mouth means a happy pet!
            </p>
            <a href="appointment.html" className="btn btn-primary">
              Book an Appointment
            </a>
          </div>
        </div>
      </section>

    
    <Footer/>
    </>
  )
}
