import './Trees.scss';
import React, { useContext, useState, useEffect } from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar } from '@ionic/react';

import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import settingsIcon from '../assets/icons/link.svg';

import { addOutline } from 'ionicons/icons';
import AddTree from '../desktopComponents/AddTree';
import TreeCard from '../globalComponents/TreeCard';

const Trees = ({ treesState, toggleSection, token, activeTree, setActiveTree, setActiveBranch }) => {
    const debug = true;
    const [showAddModal, setShowAddModal] = useState(false);

    const [trees, setTrees] = useState([]);

    if (debug) console.log('Trees', trees, activeTree);

    const subscribeToTree = id => {
        const debug = true;
        if (debug) console.log('Trees subscribeToTree', id);

        const tree = trees.find(tree => tree._id === id);
        setActiveTree(tree);
        setActiveBranch(tree.branches[0]);
    }

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    }

    const treesClassName = () => {
        if (treesState) return 'trees';
        else return 'trees trees--inactive'
    }

    useEffect(() => {
        const getTrees = async () => {
            await window.socket.forrestSetEventHandler('getTrees', setTrees);
            window.socket.forrestEmit('getTrees', {});
        }
        getTrees();
    }, [setTrees])

    return (
        <>
            <IonPage className={treesClassName()}>
                <IonContent className='ion-text-center'>
                <div className='trees__actions'>
                    <img 
                        className='trees__cloud' 
                        src={cloudIcon} />
                    <img
                        // onClick={() => setSettings(prev => !prev)} 
                        className='trees__settings' 
                        src={settingsIcon} />
                    <img
                        onClick={() => toggleSection('trees')} 
                        className='trees__close' 
                        src={closeIcon} />
                </div>
                <p className='trees__title ion-color-primary'>Trees</p>
                <IonSearchbar 
                    // onIonChange={e => setSearch(e.detail.value || '')}
                    className='trees__search ion-text-left' 
                    placeholder=''
                />
                {trees.map(tree => {
                    return (
                        <TreeCard 
                            key={tree._id}
                            icon={tree.icon}
                            treeName={tree.name}
                            treeId={tree._id}
                            ownerName={token.info.userName}
                            activeTree={activeTree}
                            subscribeToTree={subscribeToTree}
                            //actions={settings}
                        />
                    )
                })
                }
                { window.socket.isUser() && <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton onClick={() => {
                       toggleAddModal();
                    }}>
                    <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab> }
                </IonContent>
        </IonPage>
        { showAddModal && 
            <AddTree toggleAddModal={toggleAddModal}/> 
        }
    </>
    )
}

export default Trees;
