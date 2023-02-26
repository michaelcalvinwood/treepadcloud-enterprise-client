import "./LeafCard.scss";

import React from 'react'

function LeafCard({leaf, activeBranch}) {
  const { id, icon, name } = leaf;



  return (
    <div className="leaf-card"
      onClick={() => window.socket.forrestEmit('setActiveModule', {moduleId: id, branchId: activeBranch.branchId})}
    >
        <img
            className="leaf-card__icon" 
            src={`https://static.treepadcloud.com/images/svg/${icon}`} 
        />
        <div className="leaf-card__name">
            {name}
        </div>

    </div>
  )
}

export default LeafCard