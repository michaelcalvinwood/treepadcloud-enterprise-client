import './Branches.scss';
import React, { useContext, useState, useEffect } from "react";
import AppContext from '../../../data/AppContext';
import { BranchStatus } from '../../../data/AppInterfaces';
import settingsIcon from '../../../assets/icons/settings.svg';
import cloudIcon from '../../../assets/icons/cloud.svg';
import closeIcon from '../../../assets/icons/close.svg';
import { IonSearchbar } from '@ionic/react';
import Branch from '../../../components/Branch';
import * as socketIo from '../../../utils/resourceServerEmit';
import * as monitor from '../../../utils/eventMonitor';
import ModalContainer from '../../../components/ModalContainer';

let controlToggle = false;

const Branches: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const [branchStatus, setBranchStatus] = useState<BranchStatus[]>([]);

    const appCtx = useContext(AppContext);

    const p = 'Branches.tsx Branches ';

    const branchesClassName = () => {
        let cname = 'branches';

        if (!appCtx.desktopSections.trees) cname += ' branches--no-trees';
        if (!appCtx.desktopSections.branches) cname += ' branches--no-branches';
        if (!appCtx.desktopSections.controls) cname += ' branches--no-controls';
        
        return cname;
    }

    const handleBranchClose = () => {
        const newVal = appCtx.desktopSections;
        newVal.branches = false;
        appCtx.setDesktopSections(prev => {
            return({...prev, branches: false})
        });
    }

    const nameHasBeenChecked = (branchId: string) => {
        let curBranch = branchStatus.find(branch => branch.id === branchId);
        let status;
        if (curBranch) {
            status = curBranch.nameChecked;
            if (curBranch.nameChecked === false) {
                setBranchStatus(prev => {
                    let changedBranch = prev.find(branch => branch.id === branchId);
                    if (changedBranch) changedBranch.nameChecked = true;
                    return ([...prev]);
                })
            }
            return status;
        } 

        let newStatus = {
            id: branchId,
            nameChecked: true,
            open: true
        }

        setBranchStatus(prev => {
            const exists = prev.find(branch => branch.id === branchId);
            if (!exists) prev.push(newStatus);
            return ([...prev])
        })
    }

    useEffect(() => {
        // create a list of branches that have no name and have not already been checked before
        let nameList = [];
        let curBranches = appCtx.branches;
        curBranches.forEach((branch, i) => {
            if (!branch.name && !nameHasBeenChecked(branch.id)) {
                socketIo.getBranchInfo(branch.id, appCtx);
            }
        })
    },
    [appCtx.branches])

    monitor.events(['clickLoginSubmit', 'inputBranchName'], {p, appCtx, branchStatus});

    return (
        <div className={branchesClassName()}>
            <div className='trees__actions'>
                <img 
                    className='trees__cloud' 
                    src={cloudIcon} />
                <img
                    onClick={e => { 
                        controlToggle = !controlToggle;
                        appCtx.setDesktopSections(prev => {
                            prev.controls = controlToggle;
                            return ({...prev})
                        });
                        e.preventDefault();
                    }} 
                    className='trees__settings' 
                    src={settingsIcon} />
                <img
                    onClick={handleBranchClose} 
                    className='trees__close' 
                    src={closeIcon} />
            </div>
            <div className='branches__title-container'> 
                <p className='branches__title'>{appCtx.tree && appCtx.tree.treeName}</p>
            </div>

           <IonSearchbar 
                onIonChange={e => setSearch(e.detail!.value || '')}
                className='branches__search' 
                placeholder=''/>
            <div className="branches__list">
                {
                    appCtx.branches.map(branch => {
                        return <Branch 
                            key={branch.id+branch.name} 
                            curBranch={branch}
                            />
                    })
                }
                
            </div>

            
        </div>
    )
}

export default Branches;