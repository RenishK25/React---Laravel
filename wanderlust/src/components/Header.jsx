import { useState } from "react"
import {Avatar, Stack } from '@mui/material';
import styled from "styled-components";
import axios from "axios";


export default function Header() {

  const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // const user_storage = getUserFromStorage();

  const [user, setUser] = useState(getUserFromStorage);
  
  let logout = async () => {
    await axios.get("http://localhost/React%20-%20Laravel/api/api/logout");
    localStorage.removeItem('user');
    setUser();
  }
  return (
    <Container>
    <nav className="navbar navbar-expand-md bg-body-light sticky-top">
    <div className="container container-fluid">
      <a className="navbar-brand" href="/"><i className="fa-solid fa-compass"></i></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link" href="/">Home</a>
          {/* <!-- <a className="nav-link" href="/">All Listing</a> --> */}
          <a className="nav-link" href="/add">Add listing</a>
        </div>
        
        <div className="navbar-nav nav-menu ms-auto">
          
          <div className="nav-link profile" href="/">
          <Stack direction="row" spacing={1}>
          <i className="fa-solid fa-list"></i>
          {user ? (
            <Avatar className="avatar" sx={{width:"2rem", height:"2rem"}}>{user.name[0].toUpperCase()}</Avatar>
          ) : (
              <Avatar></Avatar>
            ) }
          </Stack>

            <ul className="navbar-nav-menu">
            {user ? (
                <li><a onClick={logout}> Logout </a></li>
          ) : (
            <>
            <li><a href="/login"> Log in </a></li>
            <li><a href="/signup"> Sign up </a></li> 
            </>
          )}
            </ul>
          </div>
          
        </div>
        
      </div>
    </div>
  </nav>
    </Container>
  )
}

const Container = styled.div`
  .fa-solid.fa-list{
    margin: auto;
  }  

`;