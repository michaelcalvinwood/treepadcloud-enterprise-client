import "./ModuleRouter.scss";

import React, {useState, useEffect} from 'react'
import EtherPad from "../desktopModules/EtherPad";

function ModuleRouter({activeBranch, activeModule, setCloudUrl, cloudUrl}) {
  const debug = true;
  const [leaf, setLeaf] = useState(null);

  const info = {activeBranch, activeModule};
  if (debug) console.log('ModuleRouter', info);
  
  const leafId = 'L' + activeBranch.branchId + '-' + activeModule;
    
  const setLeafWrapper = data => {
    console.log('ModuleRouter setLeafWrapper', data);
    if (data._id === leafId && !leaf || !data._id === leaf.id) setLeaf(data)
  }

  useEffect(() => {
    const myAsynFunction = async () => {
      await window.socket.forrestSetEventHandler('getLeaf', setLeafWrapper);
      window.socket.forrestEmit('getLeaf', {leafId})
    }
  
    myAsynFunction();
  })

  return (
    <div className="module-router">
        {activeModule === 'etherpad' && 
          <EtherPad 
            leaf={leaf}
            setCloudUrl={setCloudUrl}
            cloudUrl={cloudUrl}
          />
        }
    </div>
  )
}

export default ModuleRouter