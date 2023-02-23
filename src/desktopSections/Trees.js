import './Trees.scss';
import React, { useContext, useState, useEffect } from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar } from '@ionic/react';

import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import settingsIcon from '../assets/icons/link.svg';

import { addOutline } from 'ionicons/icons';
import AddTree from '../desktopComponents/AddTree';

const Trees = ({ treesState, toggleSection }) => {
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    }

    console.log("Trees", treesState);

    const treesClassName = () => {
        if (treesState) return 'trees';
        else return 'trees trees--inactive'
    }

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
                {/* {appCtx.trees.map(tree => {
                    return (
                        <TreeCard 
                            key={tree.id}
                            server={server}
                            icon={tree.icon}
                            treeName={tree.name}
                            treeId={tree.id}
                            ownerName={tree.ownerName}
                            active={tree.id === appCtx.curTreeId}
                            actions={settings}
                        />
                    )
                })
                } */}
        
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
