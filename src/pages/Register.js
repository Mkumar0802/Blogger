import axios from 'axios'
import { useState } from 'react'
// import { Link }   from 'react-router-dom'
import './Register.css'
import { URLDevelopment } from "../Helper/Url";
// import {ValidationError} from "../utilltes/ValidationError"

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post(`${URLDevelopment}api/auth/register`, {
                username,
                email,
                password,
            });
        
            res.data &&   window.location.replace("/");
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    };
    return (
        <div className="register">
            <span className="registerTitle">REGISTER</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='label-email' >Email</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                 {
                 error && <div className="error_msg">{error}</div>
                  }
                <button className="registerButton bg-blue-900" type="submit">
                    Register
                </button>
            </form>
            
            {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
        </div>
    );
}

export default Register
