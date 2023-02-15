import { IonBackButton, IonButton, IonButtons,  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToast, IonToolbar, isPlatform } from "@ionic/react";
import { useState } from "react";
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const AddTree = () => {
    const [icon, setIcon] = useState('svg/tree.svg');
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [treeName, setTreeName] = useState('');
    const [treeDesc, setTreeDesc] = useState('');
    const [message, setMessage] = useState('');

    const setIconName = (name) => {
        setIcon(name);
    }

    const createTheTree = () => {
        if (!treeName) return setMessage('Please enter a tree name');

        // appCtx.modals.addTree.type === 'insert' ?
        //     createTree(server, token, icon, treeName, treeDesc || '', appCtx.setModals, setMessage, appCtx.setTrees) :
        //     editTree(server, token, icon, appCtx.modals.addTree.treeId, treeName, treeDesc || '', appCtx.setModals, setMessage, appCtx.setTrees);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/trees" color="light"/>
                    </IonButtons>
                    <IonTitle>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <IonImg src={treePadIcon} style={{height: "1.5rem", display: "inline-block"}} />
                            <div style={{display: "inline-block", fontSize: "1.25rem", marginLeft: '.15rem'}}>TreePad Cloud</div>
                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <div className='add-tree'>
            <div className='add-tree__content'>
                <img 
                    // onClick={() => setShowIconPicker(prev => !prev)}
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
                    onClick={createTheTree}
                    className='add-tree__button-create'>
                    {/* { appCtx.modals.addTree.type === 'insert' ?
                        'Create' :
                        'Submit'
                    } */}
                    Create
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
            </IonContent>
        </IonPage>
       
    )
}

export default AddTree;