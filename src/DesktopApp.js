import React, { useState, useEffect, useRef } from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";
import Branches from "./desktopSections/Branches";
import Leaves from "./desktopSections/Leaves";

import LoginSignUp from "./desktopComponents/LoginSignUp";
import Settings from "./desktopComponents/Settings";
import { IonToast } from "@ionic/react";

import * as socketUtil from './utils/socket-utils';

import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "./store/sliceTokens";

const DesktopApp = () => {
  const debug = true;
  const dispatch = useDispatch();

  const tokens = useSelector(state => state.tokens);
  if (!tokens.length) {
    const userToken =  JSON.parse(localStorage.getItem('userToken'));
    if (userToken) {
      const { resource, token } = userToken;
      dispatch(addToken({resource, token}))
    }
  }

  const [sections, setSections] = useState({
    controls: false,
    trees: true,
    branches: true,
    leaves: true
  })
  const [settings, setSettings] = useState(false);
  const [toast, setToast] = useState('');



  // activeModule & setActiveModule with useRef for event handlers
  const [activeModule, _setActiveModule] = useState(null);
  const activeModuleRef = useRef(activeModule);
  const setActiveModule = data => {
    if (debug) console.log('DesktopApp setActiveModule', data);
    activeModuleRef.current = data;
    _setActiveModule(data);
  }

  // activeBranch & setActiveBranch with useRef for event handlers
  const [activeBranch, _setActiveBranch] = useState(null);
  const activeBranchRef = useRef(activeBranch);
  const setActiveBranch = data => {
    activeBranchRef.current = data;
    _setActiveBranch(data);
  }

  if (debug) console.log('DesktopApp activeModule', activeModule, activeBranch);

  const toggleSection = section => {
    let modified = sections;
    sections[section] = !sections[section];
    setSections({...modified});
    }

  const updateToken = (resource, token) => {
     localStorage.setItem('userToken', JSON.stringify({resource, token}));
     dispatch(addToken({
       resource,
       token
     }))
  }

  const openSettings = () => {
    setSettings(true);
  }

  const closeSettings = () => {
    setSettings(false);
  }

  useEffect(() => {
    if (tokens.length) {
      if (debug) console.log('DesktopApp time to subscribe!');
      for (let i = 0; i < tokens.length; ++i) socketUtil.subscribe(tokens[i].resource, tokens[i].token);
    }  
  })

  if (!tokens.length) {
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
                //clearToken={clearToken}
                openSettings={openSettings}
              />
              <Controls 
                sections={sections}
                toggleSection={toggleSection}
              />
              <Trees 
                treesState={sections.trees}
                toggleSection={toggleSection}
                setActiveModule={setActiveModule}
              />
              <Branches 
                treeName={"test"}
                sections={sections}
                toggleSection={toggleSection}
                activeBranch={activeBranch}
                // changeActiveBranch={changeActiveBranch}
              />
              <Leaves 
                sections={sections}  
                activeBranch={activeBranch}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
                
              />
              { settings && <Settings closeSettings={closeSettings} 
                  //clearToken={clearToken}
                /> }
          
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
