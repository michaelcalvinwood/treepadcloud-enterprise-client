import './AddTree.scss';
import React, {useEffect, useState} from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonSearchbar, IonTextarea, IonToast } from '@ionic/react';
import IconPicker from './IconPicker';
import * as socketUtils from '../utils/socket-utils';

const AddTree = ({toggleAddModal, modalInfo, ownerName, subscriptionResource}) => {
    const [icon, setIcon] = useState('svg/tree.svg');
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [treeName, setTreeName] = useState('');
    const [treeDesc, setTreeDesc] = useState('');
    const [message, setMessage] = useState('');

    const debug = true;

    if (debug) console.log('AddTree', modalInfo);

    const setIconName = (name) => {
        setIcon(name);
    }

    const createTree = () => {
        if (!treeName) return setMessage('Please enter a tree name');
        console.log({resource: subscriptionResource, userName: ownerName, icon, treeName, treeDesc});
        socketUtils.createTree({resource: subscriptionResource, userName: ownerName, icon, treeName, treeDesc});
        toggleAddModal();
    }

    const updateTheTree = () => {
        if (!treeName) return setMessage('Please enter a tree name');

        window.socket.forrestEmit ('updateTree', { treeId: modalInfo.treeId, icon, treeName, treeDesc });
        toggleAddModal();      
    }

    useEffect(() => {
        if (modalInfo.action === 'edit') {
            if (icon !== modalInfo.icon) setIcon(modalInfo.icon);
            if (treeName !== modalInfo.treeName) setTreeName(modalInfo.treeName);
            if (treeDesc !== modalInfo.treeDesc) setTreeDesc(modalInfo.treeDesc);
        }
    }, [])
       
    return (
        <div className='add-tree'>
            <div className='add-tree__content'>
                <img 
                    onClick={() => setShowIconPicker(prev => !prev)}
                    className='add-tree__icon' 
                    src={`https://static.treepadcloud.com/images/${icon}`} 
                />
                <p className='add-tree__instructions'>click to change</p>
                <IonItem className='add-tree__input-tree-name'>
                    <IonLabel position='floating'>Tree Name</IonLabel>
                    <IonInput
                        value={treeName}
                        onIonChange={e => setTreeName(e.detail.value || '')}  
                        type='text' />
                </IonItem>
                <IonItem className='add-tree__input-tree-description'>
                    <IonLabel position='floating'>Tree Description (optional)</IonLabel>
                    <IonTextarea
                        value={treeDesc}
                        onIonChange={e => setTreeDesc(e.detail.value || '')}/>
                </IonItem>
                <IonButton 
                    onClick={modalInfo.action === 'add' ? createTree : updateTheTree}
                    className='add-tree__button-create'>
                    {modalInfo.action === 'add' ? 'Create' : 'Update'}
                </IonButton>
                {showIconPicker && 
                    <IconPicker 
                        setIconName={setIconName}
                        setShowIconPicker={setShowIconPicker}/>
                }
                <IonButton 
                    onClick={toggleAddModal}
                    className='add-tree__button-close'
                    >
                    Close
                </IonButton>
            </div>
            <IonToast
                position='top'
                color="secondary"
                message={message}
                isOpen={!!message}
                duration={3000}
                onDidDismiss={() => setMessage('')} />
        </div>
    )
}

export default AddTree;