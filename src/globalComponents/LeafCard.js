import "./LeafCard.scss";

import React from 'react'

function LeafCard({icon, name}) {
  return (
    <div className="leaf-card">
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