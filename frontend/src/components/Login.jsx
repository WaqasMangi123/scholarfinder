import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, loginError } = useLogin(); 
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();

        setTimeout(async () => {
            await login(email.toLowerCase(), password);
          }, 300);
    };

    return (
        <div className="login-container">
            <video autoPlay muted loop className="video-bg">
                <source src="/loginbackground2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="login-content">
                <div className="bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="mb-4 text-primary text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input 
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                            <input 
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit} className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {loginError && <div className="alert alert-danger mt-3">{loginError}</div>}
                    <p className="mt-3 text-center">Don't have an account?</p>
                    <Link to="/Register" className="btn btn-secondary w-100">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
