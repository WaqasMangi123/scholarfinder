import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./allscholorship2.css";

const AllScholarships = () => {
    useEffect(() => {
        // Tawk.to script injection
        const script = document.createElement("script");
        script.src = 'https://embed.tawk.to/672012f32480f5b4f5955a27/1ibakk21o';
        script.async = true;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);

        // Cleanup function to remove script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="page-container">
            <div className="image-background">
                <img src="/allscholor5.jpg" alt="Background" className="background-image" />
            </div>
            <div className="content">
                <h1>Explore Global Scholarships for a Brighter Future</h1>
                <p>Find opportunities to study anywhere in the world and make your dreams a reality.</p>
                <Link to="/scholorshiplisting">
                    <button className="view-button">View All Scholarships</button>
                </Link>
            </div>
        </div>
    );
};

export default AllScholarships;
