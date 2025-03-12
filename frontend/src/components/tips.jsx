// ScholarshipTips.js
import React from 'react';
import './tips.css';

const ScholarshipTips = () => {
    const tips = [
        { 
            title: "Start Early and Stay Organized", 
            description: "Begin your scholarship search as early as possible. Organize your applications and deadlines in a calendar to avoid last-minute stress.", 
            image: "/tip1.webp"  // Path relative to public folder
        },
        { 
            title: "Tailor Your Applications", 
            description: "Customize each application to the specific scholarship criteria, focusing on relevant achievements and goals to strengthen your candidacy.", 
            image: "/tip2.webp"  // Path relative to public folder
        },
        { 
            title: "Write Compelling Essays", 
            description: "Scholarship essays should highlight your strengths, goals, and values. Proofread your essays carefully to make a positive impression.", 
            image: "/tip3.webp"  // Path relative to public folder
        },
        { 
            title: "Secure Strong Recommendations", 
            description: "Reach out to teachers or mentors who can provide a personalized recommendation. Give them time to write a well-thought-out endorsement.", 
            image: "/tip4.webp"  // Path relative to public folder
        },
        { 
            title: "Apply Widely", 
            description: "Increase your chances of success by applying to multiple scholarships. Keep track of eligibility requirements to maximize opportunities.", 
            image: "/tip5.webp"  // Path relative to public folder
        },
    ];

    return (
        <div className="scholarship-tips-page">
            <h1>Scholarship Tips & Guidance</h1>

            {/* Scholarship Tips Section */}
            <section className="tips-section">
                {tips.map((tip, index) => (
                    <div className="tip-item" key={index}>
                        <img src={tip.image} alt={tip.title} className="tip-image" />
                        <div className="tip-content">
                            <h2>{tip.title}</h2>
                            <p>{tip.description}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Guidance Section with Left Image and Right Text */}
            <section className="guidance-section">
                <div className="guidance-content">
                    <div className="guidance-image">
                        <img src="/guidance.webp" alt="Scholarship Guidance" />
                    </div>
                    <div className="guidance-text">
                        <h2>Important Guidance for Scholarship Seekers</h2>
                        <p>While searching for scholarships, be cautious about fraudulent consultants and services that promise guaranteed scholarships in exchange for fees.</p>
                        <ul>
                            <li><strong>Do Your Research:</strong> Check the credibility of consultants or services. Look for verified reviews and consult official scholarship websites for information.</li>
                            <li><strong>Avoid Upfront Fees:</strong> Genuine scholarship providers do not charge upfront fees. Be wary of consultants demanding payment for "guaranteed results."</li>
                            <li><strong>Protect Your Personal Information:</strong> Never provide sensitive personal information unless you're sure of the organization’s legitimacy.</li>
                            <li><strong>Direct Applications:</strong> Whenever possible, apply directly through official scholarship portals rather than through third-party consultants.</li>
                            <li><strong>Seek Advice:</strong> Reach out to educational counselors or trusted mentors if you have questions about the legitimacy of a service or scholarship.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ScholarshipTips;
