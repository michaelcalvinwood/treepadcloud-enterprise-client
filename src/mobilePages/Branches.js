import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import React, { useContext } from "react";

import { add } from 'ionicons/icons';
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';


const Branches = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    
                    <IonTitle className="ion-text-center" style={{verticalAlign: "middle"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <IonImg src={treePadIcon} style={{height: "1.5rem", display: "inline-block"}} />
                            <div style={{display: "inline-block", fontSize: "1.25rem", marginLeft: '.15rem'}}>TreePad Cloud</div>
                        </div>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonSearchbar 
                    // onIonChange={e => setSearch(e.detail.value || '')}
                    className='trees__search ion-text-left' 
                    placeholder=''
                    />
            <h2 className="ion-text-center">Branches</h2>
            </IonContent>
        </IonPage>
    )
}

export default Branches;