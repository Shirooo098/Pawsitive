import './Register.css';

function RegisterPage(){
    return(
       <div className="register-container">
        <form action="">
            <div className="formHeader">
                <h1>Register Form</h1>

            </div>

            <div className="rowName">
                <div className="colFirstName">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" required/>
                </div>
                <div className="colLastName">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" required/>
                </div>
            </div>

            <div className="rowUsername">
                <label htmlFor="username">Username</label>
                <input type="text" required/>
            </div>

            <div className="rowPassword">
                <label htmlFor="password">Password</label>
                <input type="password" required/>
            </div>

            <div className="rowConfirmPassword">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" required/>
            </div>
            
            <div className="consent">
                <div className="consent-header">
                    <h4>Agreement & Consent</h4>
                </div>
                
               <div className="container-check">
                    <div className="consent-check">
                        <input type="checkbox" />
                        <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>

                    <div className="privacy-check">
                        <input type="checkbox" />
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