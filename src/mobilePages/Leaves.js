import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import React, { useContext } from "react";

import { add } from 'ionicons/icons';
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const Leaves = () => {
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
                    {/* {isPlatform('ios') && (
                        <IonButtons slot="end">
                            <IonButton routerLink="/new-memory">
                                <IonIcon slot="icon-only" icon={add} />
                            </IonButton>
                        </IonButtons>
                    )} */}
                </IonToolbar>
            </IonHeader>
            <IonContent>
               Leaves
            </IonContent>
        </IonPage>
    )
}

export default Leaves;