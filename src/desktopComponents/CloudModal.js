import './CloudModal.scss';
import React, {useContext, useEffect, useState} from 'react';
//import AppContext from '../data/AppContext';
import { IonButton, IonInput, IonItem, IonLabel, IonSearchbar, IonTextarea, IonToast } from '@ionic/react';
import IconPicker from './IconPicker';
//import IconPicker from '../components/IconPicker';
//import { createTree, editTree } from '../utils/api-axios';

const CloudModal = ({toggleCloudModal, cloudUrl}) => {
    
    const [message, setMessage] = useState('');

    
    return (
        <div className='cloud-modal'>
            <div className='cloud-modal__content'>
                <h1 style={{textAlign: 'center'}}>
                    {cloudUrl}
                </h1>
                <IonButton 
                    onClick={toggleCloudModal}
                    className='cloud-modal__button-close'
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

export default CloudModal;