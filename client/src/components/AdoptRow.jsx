import React from 'react';
import { API_BASE_URL } from '../api/auth';

export default function AdoptRow({ adopt, onUpdate, onDelete }) {
  return (
    <div className="adoptions-container">
      {adopt.map((adt) => {
        const date = new Date(adt.scheduledate);
        const formatDate = date.toLocaleDateString('en-CA');
        const status = adt.status.charAt(0).toUpperCase() + adt.status.slice(1);

        return (
          <div key={adt.id} className="adoption-container">
            <div className="adoption">
              <div className="adoption-details">
                <img 
                  src={`${API_BASE_URL}${adt.petimage}`} 
                  alt={adt.petname} 
                />
                <div className="pet-information">
                  <p>{adt.petname}</p>
                  <div className="sex-breed">
                    <p>{adt.petbreed || 'Unknown breed'}</p>
                    <p>{adt.petsex || 'Unknown sex'}</p>
                  </div>
                </div>
              </div>
              
              <div className="adoption-info">
                <p><strong>Date:</strong> {formatDate}</p>
                <p><strong>Name:</strong> {adt.fullname}</p>
                <p><strong>Email:</strong> {adt.email}</p>
                <p><strong>Contact:</strong> {adt.contact}</p>
                <p><strong>Reason:</strong> {adt.reason}</p>
              </div>

              <div className="status-container">
                <div className="status">
                  <p>Status: {status}</p>
                </div>
                {status !== 'Approved' && (
                  <div className="actionBtn">
                    <button 
                      className="btn btn-primary"
                      onClick={() => onUpdate(adt.id)}
                    >
                      Update
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => onDelete(adt.id)}
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