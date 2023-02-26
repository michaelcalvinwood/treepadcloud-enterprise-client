import './Leaves.scss';
import React, { useContext, useEffect, useState } from "react";

import fullScreenIcon from '../assets/icons/full-screen.svg';
import normalScreenIcon from '../assets/icons/normal-screen.svg';
import settingsIcon from '../assets/icons/settings.svg';
import cloudIcon from '../assets/icons/cloud.svg';
import LeafCard from '../globalComponents/LeafCard';

const Leaves = ({sections, activeBranch, activeModule, setActiveModule}) => {
    const debug = true;
    if (debug) console.log('Leaves', activeBranch, activeModule)
    const leaves = [
        {
            id: 'etherpad',
            icon: 'etherpad.svg',
            name: 'EtherPad'
        },
        {
            id: 'audioChat',
            icon: 'audio.svg',
            name: 'Audio Chat'
        }
    ]

    const { controls: controlsState, trees: treesState, branches: branchesState } = sections;
    
    const [isFullScreen, setIsFullScreen] = useState(false);

    const setFullScreen = () => setIsFullScreen(true);

    const setNormalScreen = () => setIsFullScreen(false);

    const leavesClassName = () => {
        let cname = 'leaves';

        let ammend = ' leaves';

        if (!treesState) ammend += '--no-trees';
        if (!branchesState) ammend += '--no-branches';
        if (!controlsState) ammend += '--no-controls';
        
        if (ammend !== ' leaves') cname += ammend;

        if (isFullScreen) cname += ' leaves--full-screen';
        return cname;
    }

    const moduleImgSrc = (moduleId) => {
        // const module = modules.find(m => m.id === moduleId);

        // if (!module) return "";

        // return server + module.icon;

    }

    return (
        <div className={leavesClassName()}>
            <div className='leaves__actions'>
                <img 
                    className='leaves__cloud' 
                    src={cloudIcon} />
                {/* <img
                    className='leaves__settings' 
                    src={settingsIcon} /> */}
               { isFullScreen ?
                <img 
                className='leaves__normal-screen'
                onClick={setNormalScreen} 
                src={normalScreenIcon} /> :
                <img 
                    className='leaves__full-screen'
                    onClick={setFullScreen} 
                    src={fullScreenIcon} />
               }
            </div>
            <div className='leaves__modules'>
            {
                activeBranch && !activeModule && leaves.map(leaf => {
                    return (
                        <LeafCard 
                            key={activeBranch.branchId + '_' + leaf.id}
                            leaf={leaf}
                            activeBranch={activeBranch}
                        />
                    )
                })
            }    
              
            </div>
            


        </div>
        
    )
}

export default Leaves;
