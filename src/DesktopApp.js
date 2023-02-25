import React, { useState } from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";
import Branches from "./desktopSections/Branches";
import Leaves from "./desktopSections/Leaves";

import LoginSignUp from "./desktopComponents/LoginSignUp";
import Settings from "./desktopComponents/Settings";
import { IonToast } from "@ionic/react";

const DesktopApp = () => {
  const debug = false;

  const [token, setToken] = useState(localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
  const [sections, setSections] = useState({
    controls: false,
    trees: true,
    branches: true,
    leaves: true
  })
  const [settings, setSettings] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTree, setActiveTree] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null);

  if (debug) console.log('DesktopApp token', token);

  window.setToast = setToast;
  window.token = token;

  if (token && token.info && token.info.userName) {
    if (debug) console.log('DesktopApp window.socket', window.socket);
    window.socket.connectToForrest();
  }

  const toggleSection = section => {
    let modified = sections;
    sections[section] = !sections[section];
    setSections({...modified});
    }

  const updateToken = token => {
     localStorage.setItem('token', JSON.stringify(token));
     setToken(token);
  }

  const openSettings = () => {
    setSettings(true);
  }

  const closeSettings = () => {
    setSettings(false);
  }

  const clearToken = () => {
    console.log('clear token');
    setToken(null);
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
                openSettings={openSettings}
              />
              <Controls 
                sections={sections}
                toggleSection={toggleSection}
              />
              <Trees 
                treesState={sections.trees}
                toggleSection={toggleSection}
                token={token}
                activeTree={activeTree}
                setActiveTree={setActiveTree}
              />
              <Branches 
                treeName={"test"}
                sections={sections}
                toggleSection={toggleSection}
                activeTree={activeTree}
                activeBranch={activeBranch}
                setActiveBranch={setActiveBranch}
              />
              <Leaves 
                sections={sections}  
                activeBranch={activeBranch}
              />
              { settings && <Settings closeSettings={closeSettings} clearToken={clearToken}/> }
          
              <IonToast 
                color="secondary"
                position='middle'
                message={toast}
                isOpen={!!toast}
                duration={3500}
                onDidDismiss={() => setToast('')}
            />          
        </div>
    </div>
  );
}
export default DesktopApp;
