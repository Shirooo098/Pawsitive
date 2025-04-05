import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../api/auth";
import { useAuth } from "../hooks/AuthContext";

function LoginPage(){

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateForm(loginData);
        setErrors(validationError);

        try {
            const res = await loginValidation(loginData, setIsLoggedIn);
            
            if(res.user){
                if(res.user.role === 'admin'){
                    navigate('/Dashboard');
                }else{
                    navigate('/');
                }
            }

            if(res.error){
                setErrors({ server: res.error });
            }
        } catch (error) {
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setLoginData({
            ...loginData,
             [name] : value,
        })
    }

    const validateForm = (data) => {
        let errors = {};

        if(!data.email){
            errors.email = 'Email is required!'
        }
        if(!data.password){
            errors.password = 'Password is required!'
        }

        return errors;
    }
    
    return(
        <div>
            <div className="register-container">
                    <form onSubmit={handleSubmit}>
                        <div className="formHeader">
                            <h1>Login Form</h1>

                        </div>


                        <span>{errors.server || errors.email || errors.password}</span>

                        <div className="rowEmail">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                name="email"
                                onChange={handleChange}
                                value={loginData.email}
                            />
                           
                        </div>

                        <div className="rowPassword">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name="password" 
                                onChange={handleChange}
                                value={loginData.password}
                            />
                           
                        </div>

                        <div className="login-container">
                            <button className="loginBtn" type="submit">Login</button>
                        </div>

                        
                        <div className="login-link">
                            <p>Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </form>

            </div>
        </div>
    )
}

export default LoginPage;