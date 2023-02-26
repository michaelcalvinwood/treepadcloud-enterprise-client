import './EtherPad.scss';
import React from 'react'

function EtherPad({leaf}) {
    const debug = true;
    if (debug) console.log('EtherPad', leaf);
  return (
    <div className='etherpad'>
        { leaf && leaf.module === 'etherpad' &&
        <iframe 
            src={`https://etherpad-aaa.treepadcloud.com/p/${leaf._id.replaceAll('-', '')}`} 
            className='etherpad__content' />


        }
    </div>
  )
}

export default EtherPad