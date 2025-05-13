import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { uploadImage } from '../../api/adminAdoption';
import ManageAdoption from './ManageAdoption';

export default function AddPet() {

    const navigate = useNavigate();
    const [pet, setPet] = useState({
        petName: '',
        petAge: '',
        petSex: '',
        petBreed: '',
    })

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if(type === 'file') {
            setPet((prev) => ({
                ...prev, [name] : files[0]
            }))
        } else {
            setPet((prev) => ({
                ...prev, [name] : value
            }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('petImage', pet.petImage);
        formData.append('petName', pet.petName);
        formData.append('petAge', pet.petAge);
        formData.append('petSex', pet.petSex);
        formData.append('petBreed', pet.petBreed);

        try {
            const res = await uploadImage(formData);
            console.log("Response from server:", res);
            if(res.error){
                setErrors({ server: res.error });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
    return (
        <>
            <div className="pet-container">
                <form encType='multipart/form-data' onSubmit={handleSubmit}>
                    <div className="formHeader">
                        <h1>Add Pet Adoption</h1>
                    </div>

                    <div className="rowImage">
                        <label htmlFor="petImage">Pet Image</label>
                        <input type="file"
                            name="petImage"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="rowAdoptName">
                        <label htmlFor="petName">Pet Name</label>
                        <input type="text"
                            name="petName"
                            value={pet.petName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="rowAdoptAge">
                        <label htmlFor="petAge">Pet Age</label>
                        <input type="text"
                            name="petAge"
                            value={pet.petAge}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="rowAdoptSex">
                        <label htmlFor="petSex">Pet Sex</label>
                        <input type="text"
                            name="petSex"
                            value={pet.petSex}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="rowAdoptBreed">
                        <label htmlFor="petBreed">Pet Breed</label>
                        <input type="text"
                            name="petBreed"
                            value={pet.petBreed}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="formBtn-container">
                        <button className="btn btn-danger" type="button">Cancel</button>
                        <button className="btn btn-primary" type="submit">Add Pet</button>
                    </div>
                </form>
            </div>

            <ManageAdoption/>
        </>
    )
}
