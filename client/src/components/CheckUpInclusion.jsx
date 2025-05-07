import React from 'react'
import c1 from '../assets/images/c1.jpg';
import c2 from '../assets/images/c2.jpg';
import c3 from '../assets/images/c3.jpg';
import labtestdog1 from '../assets/images/labtestdog1.jpg';

export default function CheckUpInclusion() {
  return (
    <section className="services-section text-center">
    <h2 className="section-title">What’s Included?</h2>
    <p className="section-subtext">A comprehensive health screening from nose to tail.</p>
    <div className="container">
      {[{
        title: "Physical Exam",
        text: "Our Physical Exam service keeps your pets healthy by checking important areas. We look at their eyes for vision problems, ears for cleanliness and infections, and skin for rashes or parasites. We also assess joint movement for any pain. Additionally, we monitor their weight, heart rate, and breathing. This exam helps catch health issues early, provides tips on care, and gives you peace of mind about your pet's health. Regular check-ups are essential for your pet's well-being!",
        img: c1,
        reverse: false
      }, {
        title: "Dental Check",
        text: "Our Dental Check service focuses on your pet's gum and tooth health. We evaluate the condition of their gums for signs of inflammation or disease and check their teeth for plaque, tartar, and any decay. Regular dental checks are important to prevent oral health issues, ensure fresh breath, and maintain overall well-being. Keeping your pet's teeth healthy contributes to their happiness and longevity!",
        img: c2,
        reverse: true
      }, {
        title: "Weight & Diet",
        text: "Our Weight & Diet service assesses your pet's weight and provides personalized feeding guidance. We evaluate whether your pet is at a healthy weight and discuss their dietary needs based on age, activity level, and health conditions. This service helps prevent obesity and related health issues, ensuring your pet maintains a balanced diet for optimal health and energy. Keeping your pet's weight in check is essential for their overall well-being!",
        img: c3,
        reverse: false
      }, {
        title: "Lab Tests",
        text: "Our Lab Tests service includes bloodwork and other diagnostics to monitor your pet's health. These tests help us identify underlying health issues, assess organ function, and check for infections or diseases. Regular lab tests are essential for early detection and treatment, ensuring your pet stays healthy and happy. We provide clear results and guidance based on the findings to keep your pet in top shape!",
        img: labtestdog1,
        reverse: true
      }].map(({ title, text, img, reverse }, i) => (
        <div className="row mt-4 align-items-center" key={i}>
          <div className={`col-md-4 ${reverse ? "order-md-2" : ""}`}>
            <div className="service-pet-card">
              <img src={img} alt="Vet with pet during check-up" className="img-fluid rounded shadow" style={{ height: "4in", width: "100%" }} />
            </div>
          </div>
          <div className={`col-md-8 ${reverse ? "order-md-1" : ""}`}>
            <div className="info-section">
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}
