import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-transparent.png';
import dog from '../assets/images/dog.jpg';
import kitten from '../assets/images/kitten.webp';
import puppy from '../assets/images/puppy.avif';

export default function Hero() {
  return (
    <section className="hero-wrapper py-5">
      <div className="container d-flex align-items-center text-center">
        <div className="row w-100">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <img src={logo} alt="Pawsitive Care Logo" className="img-fluid mb-3 logo" />
            <h1 className="hero-text">Welcome to Pawsitive Care</h1>
            <p className="hero-subtext">Providing compassionate veterinary care for your beloved pets!</p>
            <Link to="/register" className="btn btn-primary btn-lg mt-3">Join Us Now</Link>
          </div>
          <div className="col-md-6">
            <div id="animalCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
              <div className="carousel-inner">
                   <div className="carousel-item active">
                  <img src={dog} className="d-block w-100" alt="Happy dog" />
                </div>
                <div className="carousel-item">
                  <img src={kitten} className="d-block w-100" alt="Cute kitten" />
                </div>
                <div className="carousel-item">
                  <img src={puppy} className="d-block w-100" alt="Playful puppy" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#animalCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#animalCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
