
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect or handle successful login
    } catch (err) {
      setError(err.message || 'An error occurred during sign-in.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Link to="/" className>
                <img className="rounded-circle" src="img/logo.png" alt="Logo" style={{ width: 150, height: 150 }} />
              </Link>
              <h3>Sign In</h3>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <a href>Forgot Password</a>
              </div>
              <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button>
            </form>
            <p className="text-center mb-0">
              Don't have an Account? <Link to="/authentification/signup">Sign Up</Link>
            </p>
          </div>
          © <a href="https://esprit.tn">ESPRIT</a>, All Right Reserved.
          Designed & Distributed By <a className="border-bottom" href="https://esprit.tn/rdi/espri-tech" target="_blank">ESPRIT-Tech</a>
        </div>
      </div>
    </div>
  );
};

export default Login;