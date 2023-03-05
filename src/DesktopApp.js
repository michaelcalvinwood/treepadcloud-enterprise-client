import React, { useState, useEffect, useRef } from "react";
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

  const getActiveModule = info => {
    const debug = true;
    const { moduleId, branchId } = info;
    const activeBranch = activeBranchRef.current;
    const activeModule = activeModuleRef.current;
    if (debug) console.log('DesktopApp getActiveModule', branchId, activeBranch, moduleId, activeModule);
    if (activeBranch === null) {
      if (debug) console.log('DesktopApp getActiveModule: NO ACTIVE BRANCH');
      return;
    } else if (activeBranch.branchId === branchId && activeModule !== moduleId) setActiveModule(moduleId);
  }

  const changeActiveBranch = async branch => {
    if (debug) console.log('DesktopApp changeActiveBranch', branch, "activeModule");
    if (branch === activeBranch) return;
    setActiveBranch(branch);
    setActiveModule(null);
    await window.socket.forrestSetEventHandler('ActiveModule', getActiveModule);
    window.socket.forrestEmit ('getActiveModule', { branchId: branch.branchId });
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
        changeActiveBranch(info.newBranch);
      }
    }
  }

  const deleteTree = treeId => {
    if (debug) console.log('DesktopApp deleteTree', treeId, activeTree);

    window.socket.forrestEmit('deleteTree', {treeId});
    if (activeTree._id === treeId) {
      setActiveTree(null);
      changeActiveBranch(null);
    }
  }

  const myAsyncFunction = async () => {
    
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
                changeActiveBranch={changeActiveBranch}
                setActiveModule={setActiveModule}
                deleteTree={deleteTree}
              />
              <Branches 
                treeName={"test"}
                sections={sections}
                toggleSection={toggleSection}
                activeTree={activeTree}
                activeBranch={activeBranch}
                changeActiveBranch={changeActiveBranch}
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
