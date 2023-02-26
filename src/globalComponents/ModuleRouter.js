import "./ModuleRouter.scss";

import React from 'react'

function ModuleRouter({activeBranch, activeModule}) {
  const debug = true;
  const leafId = 'L' + activeBranch.branchId + '-' + activeModule;
  if (debug) console.log('ModuleRouter', activeBranch, activeModule, leafId);
  return (
    <div className="module-router">
        Module Router
    </div>
  )
}

export default ModuleRouter