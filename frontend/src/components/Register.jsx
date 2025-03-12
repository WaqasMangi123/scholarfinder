import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';
import './register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, signupError, signupIsLoading, success } = useSignup();
  const navigate = useNavigate(); 

  // Effect to navigate to login page on successful signup
  useEffect(() => {
    if (success) {
      // Navigate to login page after a successful signup
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust delay as needed

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [success, navigate]);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields'); // Simple validation
      return;
    }

    await signup(name, email.toLowerCase(), password); // Call signup directly
  };

  return (
    <div className="register-container">
      <video autoPlay muted loop className="video-bg">
        <source src="/registerbackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="register-content">
        <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="mb-4 text-primary text-center">Register</h2>
          <form>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputName1" className="form-label"><strong>Name</strong></label>
              <input 
                type="text"
                placeholder="Enter Name"
                className="form-control" 
                id="exampleInputName1" 
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> 
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email Id</strong></label>
              <input 
                type="email" 
                placeholder="Enter Email"
                className="form-control" 
                id="exampleInputEmail1" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              /> 
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
              <input 
                type="password" 
                placeholder="Enter Password"
                className="form-control" 
                id="exampleInputPassword1" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button 
              type="button" 
              onClick={handleSignup} 
              className="btn btn-primary w-100" 
              disabled={signupIsLoading}
            >
              {signupIsLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
          {success && <div className="alert alert-success mt-3">{success}</div>} {/* Show success message */}
          {signupError && <div className="alert alert-danger mt-3">{signupError}</div>} {/* Show error below the button */}
          <p className="mt-3 text-center">Already have an account?</p>
          <Link to='/login' className="btn btn-secondary w-100">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
