import React from 'react'
import Footer from '../components/Footer'
import '../assets/styles/grooming.css'
import AppointmentButton from '../components/AppointmentButton'

export default function Grooming() {
  return (
    <>
     <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-4">
            <span className="grooming">Grooming</span> <br /> Services
          </h1>
          <p className="lead">
            Our professional grooming services are designed to keep your <br />
            furry friends looking and feeling their best.
          </p>
          <AppointmentButton/>
        </div>
      </section>

      {/* Grooming Services */}
      <section className="pb2-section text-center">
        <h1>
          Your Pet Deserves the Best{" "}
          <span className="grooming">Grooming</span> Experience!
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row">
              {/* Bathing and Drying */}
              <div className="col-md-4">
                <div className="service-card2">
                  <img
                    src="https://t4.ftcdn.net/jpg/10/31/35/57/360_F_1031355754_26IX4msNS7rtTgt8MXooveBaecblVw90.jpg"
                    alt="Bathing and Drying"
                    className="service-groom-image"
                  />
                  <h3>Bathing and Drying</h3>
                  <p>
                    High-quality shampoos and conditioners tailored to your pet's coat
                    type. Our gentle drying techniques ensure a stress-free experience.
                  </p>
                </div>
              </div>

              {/* Haircuts and Styling */}
              <div className="col-md-4">
                <div className="service-card2">
                  <img
                    src="https://images.airtasker.com/v7/https://airtasker-seo-assets-prod.s3.amazonaws.com/en_AU/1647854982499_lioncut.jpg"
                    alt="Haircuts and Styling"
                    className="service-groom-image"
                  />
                  <h3>Haircuts and Styling</h3>
                  <p>
                    From simple trims to stylish cuts, our skilled groomers work with all
                    breeds to achieve the look you desire.
                  </p>
                </div>
              </div>

              {/* Nail Trimming */}
              <div className="col-md-4">
                <div className="service-card2">
                  <img
                    src="https://images.surferseo.art/d3be53e9-1e74-4e92-994b-4b47eac71426.jpeg"
                    alt="Nail Trimming"
                    className="service-groom-image"
                  />
                  <h3>
                    Nail
                    <br /> Trimming
                  </h3>
                  <p>
                    Regular nail trims are crucial for comfort. Our team ensures this is
                    done safely and efficiently.
                  </p>
                </div>
              </div>

              {/* Ear Cleaning */}
              <div className="col-md-4">
                <div className="service-card2">
                  <img
                    src="https://www.thesprucepets.com/thmb/xvoaG8fXZrR5l0XJLS1PBqf_Jlo=/2699x0/filters:no_upscale():strip_icc()/how-to-clean-cat-ears-552112-hero-3ff4b31d30c94b91be022707e657e57e.jpg"
                    alt="Ear Cleaning"
                    className="service-groom-image"
                  />
                  <h3>
                    Ear
                    <br /> Cleaning
                  </h3>
                  <p>
                    Essential for preventing infections. We inspect and clean your pet's
                    ears thoroughly with specialized products.
                  </p>
                </div>
              </div>

              {/* Anal Gland Expression */}
              <div className="col-md-4">
                <div className="service-card2">
                  <img
                    src="https://www.metlifepetinsurance.com/content/dam/metlifecom/us/metlifepetinsurance/images/blog/Pet-Health/anal-gland-expression-inline-min.webp"
                    alt="Anal Gland Expression"
                    className="service-groom-image"
                  />
                  <h3>Anal Gland Expression</h3>
                  <p>
                    We provide anal gland expression to prevent discomfort and ensure your
                    pet remains happy and healthy.
                  </p>
                </div>
              </div>

              {/* De-shedding Treatments */}
              <div className="col-md-4">
                <div className="service-card2">
                  <img
                    src="https://cdn-fastly.petguide.com/media/2022/02/28/8289572/best-brushes-for-shedding-dogs.jpg?size=720x845&nocrop=1"
                    alt="De-shedding Treatments"
                    className="service-groom-image"
                  />
                  <h3>De-shedding Treatments</h3>
                  <p>
                    Our treatments help reduce shedding and allergens in your home,
                    especially beneficial for heavy-shedding breeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    <Footer/>
    </>
  )
}
