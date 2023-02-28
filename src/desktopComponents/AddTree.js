import './AddTree.scss';
import React, {useContext, useEffect, useState} from 'react';
//import AppContext from '../data/AppContext';
import { IonButton, IonInput, IonItem, IonLabel, IonSearchbar, IonTextarea, IonToast } from '@ionic/react';
import IconPicker from './IconPicker';
//import IconPicker from '../components/IconPicker';
//import { createTree, editTree } from '../utils/api-axios';

const AddTree = ({toggleAddModal, modalInfo}) => {
    const [icon, setIcon] = useState('svg/tree.svg');
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [treeName, setTreeName] = useState('');
    const [treeDesc, setTreeDesc] = useState('');
    const [message, setMessage] = useState('');

    const debug = true;

    if (debug) console.log('AddTree', modalInfo);

    //const appCtx = useContext(AppContext);

    //const {server, token} = appCtx.userInfo;

    const setIconName = (name) => {
        setIcon(name);
    }

    const createTheTree = () => {
        if (!treeName) return setMessage('Please enter a tree name');

        window.socket.forrestEmit ('createTree', { icon, treeName, treeDesc });
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
                    onClick={modalInfo.action === 'add' ? createTheTree : updateTheTree}
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