import React from 'react';
import { API_BASE_URL } from '../api/auth';


export default function AdoptionList({ adoptions, onUpdate, onDelete }) {
  return (
    <div className="adoptions-container">
      {adoptions.map((adopt) => {
        const date = new Date(adopt.scheduledate);
        const formatDate = date.toLocaleDateString('en-CA');
        const status = adopt.status.charAt(0).toUpperCase() + adopt.status.slice(1);

        return (
          <div key={adopt.id} className="adoption-container">
            <div className="adoption">
              <div className="adoption-details">
                <img 
                  src={`${API_BASE_URL}${adopt.petimage}`} 
                  alt={adopt.petname} 
                />
                <div className="pet-information">
                  <p>{adopt.petname}</p>
                  <div className="sex-breed">
                    <p>{adopt.petbreed || 'Unknown breed'}</p>
                    <p>{adopt.petsex || 'Unknown sex'}</p>
                  </div>
                </div>
              </div>
              
              <div className="adoption-info">
                <p><strong>Date:</strong> {formatDate}</p>
                <p><strong>Name:</strong> {adopt.fullname}</p>
                <p><strong>Email:</strong> {adopt.email}</p>
                <p><strong>Contact:</strong> {adopt.contact}</p>
                <p><strong>Reason:</strong> {adopt.reason}</p>
              </div>

              <div className="status-container">
                <div className="status">
                  <p>Status: {status}</p>
                </div>
                {status !== 'Approved' && (
                  <div className="actionBtn">
                    <button 
                      className="btn btn-primary"
                      onClick={() => onUpdate(adopt.id)}
                    >
                      Update
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => onDelete(adopt.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}