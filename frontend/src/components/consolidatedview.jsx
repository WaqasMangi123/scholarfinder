import React, { useContext } from 'react';
import { DataContext } from './datacontext';
import Template1 from './template1';
import Template2 from './template2';

const ConsolidatedView = React.forwardRef((props, ref) => {
  const { profileData, educationData, experienceData, certificatesData, awardsData, skillsData, interestsData, projectsData } = useContext(DataContext);
  const { template } = props;

  return (
    <div ref={ref} className="consolidated-view">
      {template === 'template1' ? (
        <Template1 
          profileData={profileData}
          educationData={educationData}
          experienceData={experienceData}
          certificatesData={certificatesData}
          awardsData={awardsData}
          skillsData={skillsData}
          interestsData={interestsData}
          projectsData={projectsData}
        />
      ) : (
        <Template2 
          profileData={profileData}
          educationData={educationData}
          experienceData={experienceData}
          certificatesData={certificatesData}
          awardsData={awardsData}
          skillsData={skillsData}
          interestsData={interestsData}
          projectsData={projectsData}
        />
      )}
    </div>
  );
});

export default ConsolidatedView;
