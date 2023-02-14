import { IonButton, IonButtons,  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonTitle, IonToolbar, isPlatform } from "@ionic/react";

import { add } from 'ionicons/icons';
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const AddTree = () => {
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
                </IonToolbar>
            </IonHeader>
            <IonContent>
               <h1 className="ion-text-center">Add Tree</h1>
            </IonContent>
        </IonPage>
       
    )
}

export default AddTree;