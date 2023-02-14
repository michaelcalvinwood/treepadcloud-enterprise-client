import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import React, { useContext } from "react";

import { add } from 'ionicons/icons';
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';
import AddTree from "../desktopComponents/AddTree";

const Trees = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <IonImg src={treePadIcon} style={{height: "1.5rem", display: "inline-block"}} />
                            <div style={{display: "inline-block", fontSize: "1.25rem", marginLeft: '.15rem'}}>TreePad Cloud</div>
                        </div>
                    </IonTitle>
                    {isPlatform('ios') && (
                        <IonButtons slot="end">
                            <IonButton  color="light">
                                <IonIcon slot="icon-only" icon={add} />
                            </IonButton>
                        </IonButtons>
                    )}
                   
                </IonToolbar>
            </IonHeader>
            <IonContent>
               <h1 className="ion-text-center">Trees</h1>
               {!isPlatform('ios') && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton >
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                     )}
            </IonContent>
        </IonPage>
       
    )
}

export default Trees;