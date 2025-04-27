import React from 'react'
import { useState } from 'react';
import { checkAuth } from "./../api/auth";
import { useEffect } from 'react';

export default function ConsultationForm() {

  checkAuth();

  const petTypes = ['Dog', 'Cat', 'Rabbit']
  const [consultData, setConsultData] = useState({
    fullName: '',
    email: '',
    contact: '',
    address: '',
    petType: '',
    petName: '',
    petAge: '',
    petWeight: '',
    currentMed: "",
    allergies: "",
    prevIllness: "",
    vaccStatus: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsultData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="consultation-container">
        <form>
          <div className="formHeader">
            <h1>Create a Consult</h1>
          </div>
          <div className="schedule-information">
            <div className="colUser">
                <h2>Owner Information</h2>
                <div className="rowFullName">
                    <label htmlFor="fullName">Name</label>
                    <input type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={consultData.fullName}
                        disabled
                    />
                </div>

                <div className="rowEmailApp">
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        name="email"
                        onChange={handleChange}
                        value={consultData.email}
                        disabled
                    />
                </div>

                <div className="rowContact">
                    <label htmlFor="contact">Contact</label>
                    <input type="text"
                        name="contact"
                        onChange={handleChange}
                        value={consultData.contact}
                    />
                </div>

                <div className="rowAddress">
                    <label htmlFor="address">Address</label>
                    <input type="text"
                        name="address"
                        onChange={handleChange}
                        value={consultData.address}
                    />
                </div>
            </div>

            <div className="colPet">
                <h2>Pet Information</h2>

                <div className="rowPetName">
                    <label htmlFor="petName">Pet Name</label>
                    <input type="text"
                    name="petName"
                    onChange={handleChange}
                    value={consultData.petName}/>
                </div>

                <div className="rowPetAge">
                    <label htmlFor="PetAge">Pet Age</label>
                    <input type="text"
                    name="petAge"
                    onChange={handleChange}
                    value={consultData.petAge} />
                </div>

                <div className="rowPetWeight">
                    <label htmlFor="PetWeight">Pet Weight</label>
                    <input type="text"
                    name="petWeight"
                    onChange={handleChange}
                    value={consultData.petWeight} />
                </div>

                <div className="rowPetType">
                    <label htmlFor="petType">Pet Type</label>
                    <select name="petType"
                        onChange={handleChange}
                        value={consultData.petType}>
                        <option value="">Select a Pet Type</option>
                        {petTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                      </select>
                </div>
  
            </div>

          </div>

          <div className="medication-information">
            <h2>Medical History</h2>

            <div className="colMed">
                <div className="rowCurMed">
                    <label htmlFor="currentMed">Current Medication</label>
                    <input type="text"
                        name="currentMed"
                        onChange={handleChange}
                        value={consultData.currentMed}
                    />
                </div>

                <div className="rowAllergies">
                    <label htmlFor="allergies">Allergies</label>
                    <input type="text"
                        name="allergies"
                        onChange={handleChange}
                        value={consultData.allergies}
                    />
                </div>

                <div className="rowPrevIllness">
                    <label htmlFor="prevIllness">Previous Illness</label>
                    <input type="text"
                        name="prevIllness"
                        onChange={handleChange}
                        value={consultData.prevIllness}
                    />
                </div>

                <div className="rowSymptoms">
                    <label htmlFor="symptoms">Symptoms</label>
                    <textarea name="symptoms" 
                        onChange={handleChange}
                        value={consultData.symptoms}  
                    />
                </div>

              </div>

            </div>

          </form>
        </div>
    </>
  )
}
