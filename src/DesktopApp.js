import React, { useState, useEffect } from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";
import Branches from "./desktopSections/Branches";
import Leaves from "./desktopSections/Leaves";

import LoginSignUp from "./desktopComponents/LoginSignUp";
import Settings from "./desktopComponents/Settings";
import { IonToast } from "@ionic/react";

import _ from 'lodash';

const DesktopApp = () => {
  const debug = true;

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
  const [activeModule, setActiveModule] = useState(null);

  const getActiveModule = info => {
    const debug = true;
    if (debug) console.log('getActiveModule', info);
    const { moduleId, branchId } = info;
    if (activeBranch.branchId === branchId && activeModule !== moduleId) setActiveModule(moduleId);
  }

  const addBranch = info => {
    if (debug) console.log('DesktopApp addBranch', info, activeTree);
    
    // update all displayed trees here. Need to add code for trees that are merged in
    if (activeTree._id === info.treeId) {
      let index = activeTree.branches.findIndex(branch => branch.branchId === info.branchId);
      if (index !== -1) {
        const treeCopy = _.cloneDeep(activeTree);
        treeCopy.branches.splice(index+1, 0, info.newBranch);
        setActiveTree(treeCopy);
      }
    }
  }

  const myAsyncFunction = async () => {
    await window.socket.forrestSetEventHandler('getActiveModule', getActiveModule);
    await window.socket.forrestSetEventHandler('addBranch', addBranch);
  }
  myAsyncFunction();
  
  if (debug) console.log('DesktopApp token', token);
  if (debug) console.log('DesktopApp activeTree, activeBranch, activeModule', activeTree, activeBranch, activeModule);
  
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

  useEffect(() => {
   

  });

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
                clearToken={clearToken}
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
                setActiveBranch={setActiveBranch}
                setActiveModule={setActiveModule}
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
                activeModule={activeModule}
                setActiveModule={setActiveModule}
                
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
