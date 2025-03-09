import './Register.css';
import {useState} from 'react';

function RegisterPage(){

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validateForm(formData)
        setErrors(validationError);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value,
        })
    }

    const validateForm = (data) => {
        let errors = {};

        if(!data.firstName){
            errors.firstName = 'First name is required!'
        }
        if(!data.lastName){
            errors.lastName = 'Last name is required!'
        }
        if(!data.username){
            errors.username = 'Username is required!'
        }
        if(!data.password){
            errors.password = 'Password is required!'
        }else if (data.password.length < 8) {
            errors.password = 'Passwords must be at least 8 characters long';
        }

        if(data.confirmPassword !== data.password){
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    }

    return(
       <div className="register-container">
        <form onSubmit={handleSubmit}>
            <div className="formHeader">
                <h1>Register Form</h1>

            </div>

            <div className="rowName">
                <div className="colFirstName">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" 
                        name="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                    />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </div>
                <div className="colLastName">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" 
                        name="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                    />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </div>
            </div>

            <div className="rowUsername">
                <label htmlFor="username">Username</label>
                <input type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                {errors.username && <span>{errors.username}</span>}
            </div>

            <div className="rowPassword">
                <label htmlFor="password">Password</label>
                <input type="password"
                    name="password" 
                    onChange={handleChange}
                    value={formData.password}
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <div className="rowConfirmPassword">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password"
                    name="confirmPassword" 
                    onChange={handleChange}
                    value={formData.confirmPassword}
                />
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

            </div>
            
            <div className="consent">
                <div className="consent-header">
                    <h4>Agreement & Consent</h4>
                </div>
                
               <div className="container-check">
                    <div className="consent-check">
                        <input type="checkbox" required/>
                        <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>

                    <div className="privacy-check">
                        <input type="checkbox" required/>
                        <label htmlFor="privacy">I accept to the Privacy Policy</label>
                    </div>
               </div>

                <button className="registerBtn"type="submit">Register</button>
            </div>

            
            <div className="login-link">
                <p>Already have an account? <a href="#">Login</a></p>
            </div>
        </form>

       </div>
    )
}

export default RegisterPage;