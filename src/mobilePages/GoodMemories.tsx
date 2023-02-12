import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import React, { useContext } from "react";

import { add } from 'ionicons/icons';


const GoodMemories: React.FC = () => {
   
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Good Memories
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
               
            </IonContent>
        </IonPage>
    )
}

export default GoodMemories;