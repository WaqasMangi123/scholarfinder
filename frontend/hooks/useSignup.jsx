import { useState } from 'react';
import { useAuthContext } from './UseAuthContext';

export const useSignup = () => {
    const [signupError, setSignupError] = useState(null)
    const [signupIsLoading, setSignupIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

const signup = async (name, email, password) => {
    setSignupIsLoading(true);
    setSignupError(null);
  
    try {
        const response = await fetch('http://localhost:3001/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
  
        const json = await response.json();
  
        if (!response.ok) {
            setSignupIsLoading(false);
            setSignupError(json.error || 'Something went wrong. Please try again.');
        } else {
            // Save the token and user data in localStorage
            localStorage.setItem('user', JSON.stringify(json)); // Assuming json contains the user object and token
            dispatch({ type: 'LOGIN', payload: json });
  
            setSuccess("Signup Successful!");
            setSignupIsLoading(false);
            setSignupError(null);
        }
    } catch (error) {
        setSignupIsLoading(false);
        setSignupError('Network error. Please try again.');
        console.error("Network error:", error);
    }
}
return { signup, signupError, signupIsLoading}
  };
  