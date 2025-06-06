/*
import React, { useState } from 'react'
import axios from "axios"

const Login = () => {
  const [Email,setEmail]=useState('')
  const [Password,setPassword]=useState('')
  
  async function submit(e){
    e.preventDefault();
    try{
      await axios.Post("http://localhost:3000/",{
        Email,Password
      })
    }
    catch(e){
      console.log(e);
    }
  }

  return (
  <div className="container-fluid">
  <div className="row h-100 align-items-center justify-content-center" style={{minHeight: '100vh'}}>
    <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <a href="index.html" className>
          <img className="rounded-circle" src="img/logo.png" alt style={{width: 150, height: 150}} />
          </a>
          <h3>Sign In</h3>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-4">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <a href>Forgot Password</a>
        </div>
       
        <button type="submit" className="btn btn-primary py-3 w-100 mb-4"onClick={submit}>Sign In</button>
        <p className="text-center mb-0">Don't have an Account? <a href>Sign Up</a></p>
      </div>
      © <a href="https://esprit.tn">ESPRIT</a>, All Right Reserved. 
  Designed & Distributed By <a className="border-bottom" href="https://esprit.tn/rdi/espri-tech" target="_blank">ESPRIT-Tech </a>
    </div>
  </div>
 
</div>


  

  

  )
}

export default Login 
---------------------------------------------------------------------------------------------------------------------------------*/

/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await authService.login(email, password); 
      
      console.log('Login successful:', response.data);
      // Save tokens to localStorage
      localStorage.setItem('accessToken', response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="index.html" className>
                <img className="rounded-circle" src="img/logo.png" alt style={{ width: 150, height: 150 }} />
              </a>
              <h3>Sign In</h3>
            </div>
            <form onSubmit={submit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <a href="#">Forgot Password</a>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
            </form>
            <p className="text-center mb-0">Don't have an Account? <a href="/signup">Sign Up</a></p>
          </div>
          © <a href="https://esprit.tn">ESPRIT</a>, All Right Reserved. 
          Designed & Distributed By <a className="border-bottom" href="https://esprit.tn/rdi/espri-tech" target="_blank">ESPRIT-Tech </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
*/
///////////////////////////////////////////////////////////////////////////////////////////
// views/Login.jsx
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await authService.login(Email, Password); 
      console.log('Login successful:', response);
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="index.html">
                <img className="rounded-circle" src="img/logo.png" alt="logo" style={{ width: 150, height: 150 }} />
              </a>
              <h3>Sign In</h3>
            </div>
            <form onSubmit={submit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={Email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
            </form>
            <p className="text-center mb-0">Don't have an Account? <a href="/signup">Sign Up</a></p>
          </div>
          © <a href="https://esprit.tn">ESPRIT</a>, All Right Reserved. 
          Designed & Distributed By <a className="border-bottom" href="https://esprit.tn/rdi/espri-tech" target="_blank">ESPRIT-Tech</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
//////////////////////////////////////////////////////////////////////// */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await authService.login(Email, Password); 
      console.log('Login successful:', response);
      localStorage.setItem('role', response.user.role);

      const role = response.user.role;
      console.log('User role:', response.user.role);
      console.log('User role:', authService.getUserRole());
      //Redirect based on user role
      if (role === 'etudiant') {
        navigate(`/pageEtudiant/${response.user._id}`);
        console.log('page etudiant')
      } 
      else if (role === 'enseignant') {
        navigate(`/pageEnseignant/${response.user._id}`)
      }
      else {
        navigate('/');
        console.log('home')
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  }

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <a href="index.html">
                <img className="rounded-circle" src="img/logo.png" alt="logo" style={{ width: 150, height: 150 }} />
              </a>
              <h3>Sign In</h3>
            </div>
            <form onSubmit={submit}>
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="floatingInput" 
                  placeholder="name@example.com" 
                  value={Email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input 
                  type="password" 
                  className="form-control" 
                  id="floatingPassword" 
                  placeholder="Password" 
                  value={Password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
            </form>
            <p className="text-center mb-0">Don't have an Account? <a href="/signup">Sign Up</a></p>
          </div>
          © <a href="https://esprit.tn">ESPRIT</a>, All Right Reserved. 
          Designed & Distributed By <a className="border-bottom" href="https://esprit.tn/rdi/espri-tech" target="_blank">ESPRIT-Tech</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
