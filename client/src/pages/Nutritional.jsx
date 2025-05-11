import React from 'react'
import Footer from '../components/Footer'
import vitamins from '../assets/images/vitamins.png'
import eat from '../assets/images/eat.png'
import weigh from '../assets/images/weigh.png'
import '../assets/styles/Nutritional.css'
import AppointmentButton from '../components/AppointmentButton'

export default function Nutritional() {
  return (
    <>

     <section className="hero-section-nutri text-center">
        <div className="container">
          <h1>Nutritional Counseling</h1>
          <p>
            Helping your pets live healthier, happier lives with personalized
            nutrition plans.
          </p>
          <AppointmentButton/>
        </div>
      </section>

      <section className="cards">
        <h1>Happy Pets, Happy Lives!</h1>
        <p className="intro">
          At our Nutritional Counseling service, we create special meal plans just for
          your furry friends! Our caring team helps make sure your pets enjoy
          delicious and balanced diets, leading to happier and healthier lives.
        </p>


        <div className="card">
          <img src={eat} alt="Pet Nutrition Plan" />
          <h2>♡ Personalized Diet Plans ♡</h2>
          <p>
            Every pet is unique. We assess breed, age, weight, and health conditions
            to create a customized nutrition plan.
          </p>
          <ul>
            <li>Age-specific meal suggestions</li>
            <li>Hypoallergenic options</li>
            <li>Supplements for coat &amp; joint health</li>
          </ul>
        </div>


        <div className="card">
          <img src={weigh} alt="Weight Management" />
          <h2>♡ Weight Management ♡</h2>
          <p>
            We guide pet owners in managing underweight or overweight conditions with
            goal-oriented diets and exercise advice.
          </p>
          <ul>
            <li>Portion control education</li>
            <li>Activity + meal balance tips</li>
            <li>Regular progress checks</li>
          </ul>
        </div>


        <div className="card">
          <img src={vitamins} alt="Supplement Guidance" />
          <h2>♡ Supplement Guidance ♡</h2>
          <p>
            Navigate vitamins, minerals, and dietary supplements to boost your pet’s
            well-being with our expert advice.
          </p>
          <ul>
            <li>Vet-approved supplements</li>
            <li>Safe dosage info</li>
            <li>Advice for special needs pets</li>
          </ul>
        </div>
      </section>
    <Footer/>
    </>
  )
}
