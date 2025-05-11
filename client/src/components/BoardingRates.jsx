import React from 'react'

export default function BoardingRates() {
  return (
    <>
        <section className="pb-section text-center">
    <div className="row">
      <div className="col-md-4 text-center">
        <h2 className="section-title">Top Reasons to choose our Pet Boarding!</h2>
        <p className="section-subtext">Safe, clean, and fun environment for your pets.</p>
      </div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-4">
            <div className="service-card">
              <h3>Comfortable Rooms</h3>
              <p>We offer spacious and clean rooms that help your pet feel at home. 
                Each room provides ample space to relax and play, ensuring a cozy                            
                and safe environment. With soft bedding and a friendly atmosphere, 
                your pet will enjoy a comfortable stay.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <h3>24/7 Supervision</h3>
              <p>Our attentive staff is on duty 24/7 to ensure your pet's safety and 
                happiness. We quickly respond to their needs, provide playtime, 
                and offer comfort, so you can relax knowing your furry friend is 
                well cared for at all times.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <h3>Daily Playtime</h3>
              <p>We provide fun activities to keep your pet active and social. 
                Our team organizes play sessions for pets to interact and 
                make new friends, ensuring they stay entertained and happy 
                during their stay.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="pbr-section text-center">
    <div className="row">
      <div className="col-md-6">
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Package</th>
                <th>Duration</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard Stay</td>
                <td>1-3 Days</td>
                <td>₱500/day</td>
              </tr>
              <tr>
                <td>Extended Stay</td>
                <td>4-7 Days</td>
                <td>₱450/day</td>
              </tr>
              <tr>
                <td>Luxury Stay (Private Room)</td>
                <td>Any</td>
                <td>₱800/day</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-4">
          <h2 className="section-title">Pet Boarding Rates</h2>
          <p>We provide a safe, clean, and enjoyable environment for your pets, ensuring they have a great stay while you are away. Our dedicated staff is always ready to care for your furry friends.</p>
        </div>
      </div>
    </div>
    </section>
    </>
  )
}
