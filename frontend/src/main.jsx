import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Footer from './components/Footer'
import { AuthContextProvider } from '../context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <App/>
    <Footer/>
    </AuthContextProvider>
  </React.StrictMode>
)
