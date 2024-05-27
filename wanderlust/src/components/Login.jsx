import { Alert, Fade } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


export default function Login(){

    const [formData, setFormData] = useState({name: "", email: "", password: "" });
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [error, setError] = useState();
    let navigate = useNavigate();

      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost/React%20-%20Laravel/api/api/login", formData);

            if(response.data.status ==  "success"){
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/');                
            }else{
                setAlertVisibility(true);
                setError(response.data.error);
            }
        } catch (error) {
            console.error("Axios error:", error);
        }
    };

      return (
        <>
            <Fade in={alertVisibility}>
                <Alert severity="error" onClose={() => {setAlertVisibility(false);}}>
                    {error}
                </Alert>
            </Fade>
            
            <div className="main">
            
                <h1><i className="fa-solid fa-compass icon"></i> Wanderlust</h1>
                <hr />

                <form onSubmit={handleSubmit} method="post" className="needs-validation">
                <label htmlFor="email">
                        Email:
                    </label>
                    <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} placeholder="Enter your Email" required />
                    <div className="invalid-feedback">
                        Please Enter Email.
                    </div>

                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} placeholder="Enter your Password" required />
                    <div className="invalid-feedback">
                        Please Enter Password.
                    </div>

                    <div className="wrap">
                        <button type="submit">Submit</button>
                    </div>
                </form>

                <p>Not registered? 
                    <a href="/signup" >
                        Create an account
                    </a>
                </p>
            </div>
        </>
      )
    }

    const Container = styled.div`
    .title{
      color:red;
    }
  `;