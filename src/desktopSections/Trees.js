import './Trees.scss';
import React, { useContext, useState, useEffect } from "react";
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar } from '@ionic/react';

import cloudIcon from '../assets/icons/cloud.svg';
import closeIcon from '../assets/icons/close.svg';
import settingsIcon from '../assets/icons/link.svg';

import { addOutline } from 'ionicons/icons';
import AddTree from '../desktopComponents/AddTree';
import CloudModal from '../desktopComponents/CloudModal';
import TreeCard from '../sharedComponents/TreeCard';
import { useSelector } from 'react-redux';

const Trees = ({ deleteTree, treesState, toggleSection, activeTree, setActiveTree, changeActiveBranch, setActiveModule }) => {
    const debug = true;
    const [showAddModal, setShowAddModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({action: 'add'});
    const [searchVal, setSearchVal] = useState('');

    const trees = useSelector(state => state.trees);
    const subscriptions = useSelector(state => state.subscriptions);

    const isUser = () => {
        for (let i = 0; i < subscriptions.length; ++i) {
            const { token } = subscriptions[i];
            if (token.info && token.info.userName) return true;
        }

        return false;
    }

    const getUserName = () => {
        for (let i = 0; i < subscriptions.length; ++i) {
            const { token } = subscriptions[i];
            if (token.info && token.info.userName) return token.info.userName;
        }

        return false;
    }

    const getUserResource = () => {
        console.log('getUserResource subscriptions', subscriptions)
        for (let i = 0; i < subscriptions.length; ++i) {
            const { resource, token } = subscriptions[i];
            console.log('getUserResource', resource, token);
            if (token.info && token.info.userName) return resource;
        }

        return false;
    }

    const subscribeToTree = id => {
        const debug = true;

        const tree = trees.find(tree => tree._id === id);
        setActiveTree(tree);
        changeActiveBranch(tree.branches[0]);
    }

    const toggleAddModal = () => {
        setShowAddModal(!showAddModal);
    }

    const treesClassName = () => {
        if (treesState) return 'trees';
        else return 'trees trees--inactive'
    }


    const searchValLower = searchVal.toLowerCase();
    const treesInfo = trees.filter(tree => !searchVal || tree.name.toLowerCase().indexOf(searchValLower) !== -1);

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
                <p className='trees__title ion-color-primary'>{!trees.length && 'Add a Tree'}</p>
                <IonSearchbar 
                    onIonChange={e => setSearchVal(e.target.value || '')}
                    className='trees__search ion-text-left' 
                    placeholder=''
                />
                {treesInfo.map(tree => {
                    return (
                        <TreeCard 
                            key={tree._id}
                            tree={tree}
                            ownerName={getUserName()}
                            setModalInfo={setModalInfo}
                            toggleAddModal={toggleAddModal}
                            deleteTree={deleteTree}
                            //actions={settings}
                        />
                    )
                })
                }
                { isUser() && <IonFab horizontal="end" vertical="bottom" slot="fixed">
                    <IonFabButton onClick={() => {
                        setModalInfo({action: 'add'});
                        toggleAddModal();
                    }}>
                    <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab> 
                }
                </IonContent>
        </IonPage>
        { showAddModal && 
            <AddTree 
                toggleAddModal={toggleAddModal}
                modalInfo={modalInfo}
                subscriptionResource={getUserResource()}
                ownerName={getUserName()}
            /> 
        }
       
    </>
    )
}

export default Trees;
