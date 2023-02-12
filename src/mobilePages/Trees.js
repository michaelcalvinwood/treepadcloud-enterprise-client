import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import React, { useContext } from "react";

import { add } from 'ionicons/icons';
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const Trees = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    
                    <IonTitle>
                        <IonImg src={treePadIcon} style={{height: "1.5rem", display: "inline-block"}} />
                        <div style={{lineHeight: "1.5rem", marginTop: '-24px', display: "inline-block"}}>TreePad Cloud</div>

                        {/* <IonRow className="ion-align-items-center">
                            <IonCol size="6">
                                <img src={treePadIcon} style={{height: "1.5rem"}} className="ion-float-right"/>
                            </IonCol>
                            <IonCol className="title-col" size="6" >
                                <div className="ion-float-left">TreePad Cloud</div>
                            </IonCol>
                        </IonRow> */}
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
               Trees
            </IonContent>
        </IonPage>
    )
}

export default Trees;