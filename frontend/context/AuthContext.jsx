import { createContext, useReducer, useEffect, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Define the reducer for managing auth state
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }; // Set user object on login
    case 'LOGOUT':
      return { user: null }; // Reset user state on logout
    default:
      return state;
  }
};

// Context provider component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Loaded user from localStorage:", parsedUser);
          dispatch({ type: 'LOGIN', payload: parsedUser });
        } else {
          console.log("No user data found in localStorage.");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    console.log("AuthContext State after update:", state);
  }, [state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Function to log in the user and fetch userdata
export const loginUser = async (credentials, dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error('Login failed');

    const user = await response.json();
    const userdataResponse = await fetch(`http://localhost:3001/api/userData/${user._id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    
    if (!userdataResponse.ok) throw new Error('Failed to fetch user data');

    const userdata = await userdataResponse.json();
    const fullUserData = { ...user, ...userdata };

    console.log("Full user data after login:", fullUserData);

    localStorage.setItem('user', JSON.stringify(fullUserData));
    dispatch({ type: 'LOGIN', payload: fullUserData });
  } catch (error) {
    console.error("Error during login:", error);
  }
};
