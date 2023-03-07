import './EtherPad.scss';
import React from 'react'

function EtherPad({leaf, setCloudUrl, cloudUrl}) {
    const debug = true;
    if (debug) console.log('EtherPad', leaf);
    const url = leaf ? `https://etherpad1.treepadcloud.com/p/${leaf._id.replaceAll('-', '')}` : '';
    if (url !== cloudUrl) setCloudUrl(url);
  return (
    <div className='etherpad'>
        { leaf && leaf.module === 'etherpad' &&
        <iframe 
            allow={"camera *;microphone *;speakers *"}
            src={url} 
            className='etherpad__content' />
        }
    </div>
  )
}

export default EtherPad