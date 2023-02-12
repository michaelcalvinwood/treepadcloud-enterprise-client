import './Leaves.scss';
import React, { useContext, useEffect, useState } from "react";
import AppContext from '../../../data/AppContext';

import fullScreenIcon from '../../../assets/icons/full-screen.svg';
import normalScreenIcon from '../../../assets/icons/normal-screen.svg';
import settingsIcon from '../../../assets/icons/settings.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import * as socketIo from '../../../utils/resourceServerEmit';
import ModuleDefault from '../../../modules/ModuleDefault';
import * as monitor from '../../../utils/eventMonitor';
import ModuleQuill from '../../../modules/ModuleQuill';
import ModuleImageGallery from '../../../modules/ModuleImageGallery';
import { act } from 'react-dom/test-utils';

const Leaves: React.FC = () => {
    //TODO: add a timestamp and every hour check to see if there are new modules.   
    
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [addModule, setAddModule] = useState(false);

    const appCtx = useContext(AppContext);
    const { module, modules, branches, curBranchId } = appCtx;
    const { server } = appCtx.userInfo;

    const fn = 'Leaves.tsx ';

    const setFullScreen = () => setIsFullScreen(true);

    const setNormalScreen = () => setIsFullScreen(false);

    const leavesClassName = () => {
        let cname = 'leaves';

        let ammend = ' leaves';

        if (!appCtx.desktopSections.trees) ammend += '--no-trees';
        if (!appCtx.desktopSections.branches) ammend += '--no-branches';
        if (!appCtx.desktopSections.controls) ammend += '--no-controls';
        
        if (ammend !== ' leaves') cname += ammend;

        if (isFullScreen) cname += ' leaves--full-screen';
        return cname;
    }

    const moduleImgSrc = (moduleId: number) => {
        const module = modules.find(m => m.id === moduleId);

        if (!module) return "";

        return server + module.icon;

    }

    useEffect(() => {
        
        if (modules.length === 0 && appCtx.userInfo.resourceSocket) {
            socketIo.getAllModules(appCtx);
        } 
    }, [] )

    const curBranch = branches.find(b => b.id === curBranchId);
    const activeModules = curBranch?.modules;

    monitor.events(['displayModules'], {p: 'Leaves.tsx', module, modules, curBranchId, branches, curBranch, activeModules});
    if (!activeModules) console.error(`Leaves.tsx activeModules ${activeModules}:${typeof activeModules}`);

    const isDefaultModule = !module || addModule || !activeModules || !activeModules.length;

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
                
                {activeModules && activeModules.length &&
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
                                    onClick={() => setAddModule(true)}
                                    className='leaves__active-module-icon' 
                                    src={server+'/svg/add-module.svg'} />
                            </div>
                        </div>
                    </div>
                }
                {isDefaultModule && 
                    <ModuleDefault
                        addModule={addModule}
                        setAddModule={setAddModule} />
                }
                {!isDefaultModule && module.id === 1 && 
                    <ModuleQuill 
                        isFullScreen={isFullScreen}
                        curBranchId={curBranchId}
                    />}
                {!isDefaultModule && module.id === 2 && <ModuleImageGallery />}

                {/* IMPORTANT: Use module ID # so that module names and icons can change. Or even remove a module from service by not including its id. */}
            </div>
            


        </div>
        
    )
}

export default Leaves;
