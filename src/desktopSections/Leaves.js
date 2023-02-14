import './Leaves.scss';
import React, { useContext, useEffect, useState } from "react";

import fullScreenIcon from '../assets/icons/full-screen.svg';
import normalScreenIcon from '../assets/icons/normal-screen.svg';
import settingsIcon from '../assets/icons/settings.svg';
import cloudIcon from '../assets/icons/cloud.svg';

const Leaves = ({sections}) => {
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
            <div className='leaves__module'>
                
                {/* {activeModules && activeModules.length &&
                    <div className='leaves__active-modules-container'>
                        <div className='leaves__active-modules'>
                            {activeModules.map(moduleId => {
                                return (
                                    <div 
                                        key={`module_${moduleId}`}
                                        onClick={() => {
                                            setAddModule(false);
                                            if (moduleId !== module?.id) socketIo.setCurModule(moduleId, appCtx)
                                        }}
                                        className={moduleId === module?.id && !addModule ?
                                            'leaves__active-module leaves__active-module--current' :
                                            'leaves__active-module'}>
                                        <img
                                            className='leaves__active-module-icon' 
                                            src={moduleImgSrc(moduleId)} />
                                    </div>
                                )
                            })}
                            <div className='leaves__active-module'>
                                <img
                                    // onClick={() => setAddModule(true)}
                                    className='leaves__active-module-icon' 
                                    src={server+'/svg/add-module.svg'} />
                            </div>
                        </div>
                    </div>
                }
                */}

               </div>
            


        </div>
        
    )
}

export default Leaves;
