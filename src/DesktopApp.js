import React, { useState } from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";
import Branches from "./desktopSections/Branches";
import Leaves from "./desktopSections/Leaves";

import LoginSignUp from "./desktopComponents/LoginSignUp";

const DesktopApp = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const [sections, setSections] = useState({
    controls: true,
    trees: true,
    branches: true,
    leaves: true
  })

  const toggleSection = section => {
    console.log('toggleSection', section);
    let modified = sections;
    sections[section] = !sections[section];
    setSections({...modified});
    console.log(modified);
  }

  const updateToken = token => {
     localStorage.setItem('token', JSON.stringify(token));
     setToken(token);
  }

  if (!token) {
    return (
      <div id="desktopApp">
        <div className="desktop">
          <LoginSignUp 
            updateToken={updateToken}
          />
        </div>
      </div>
    )  
  }
  
  return (
    <div id="desktopApp">
      <div className='desktop'>
              <Title 
                sections={sections}
                toggleSection={toggleSection}
              />
              <Controls 
                sections={sections}
                toggleSection={toggleSection}
              />
              <Trees 
                treesState={sections.trees}
                toggleSection={toggleSection}
              />
              <Branches 
                treeName={"test"}
                sections={sections}
                toggleSection={toggleSection}
              />
              <Leaves 
                sections={sections}  
              />
              {/* <Modals /> */}
          </div>
    </div>
  );
}
export default DesktopApp;
