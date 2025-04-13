import React from 'react'

export default function Footer() {
  return (
    <footer className="footer mt-5 py-4">
    <div className="container text-center">
        <div className="row">
            <div className="col-md-4">
                <h4>Pawsitive Care Veterinary Clinic</h4>
                <p>123 Pet Street, Quezon City, Philippines</p>
                <p>Phone: (02) 1234-5678</p>
                <p>Email: contact@pawsitivecare.com</p>
            </div>
            <div className="col-md-4">
                <h4>Follow Us</h4>
                <a href="#" className="social-icon"><i className="bi bi-facebook"></i> @pawsitivecare</a><br />
                <a href="#" className="social-icon"><i className="bi bi-instagram"></i> Pawsitive Care</a><br />
                <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i> @pawsitivecare</a>
            </div>
            <div className="col-md-4">
                <h4>Opening Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
            </div>
        </div>
        <hr className="footer-divider" />
        <p className="copyright">© 2025 Pawsitive Care. All rights reserved.</p>
    </div>
    </footer>
  )
}
