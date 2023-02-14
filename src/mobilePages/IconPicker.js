import { IonBackButton, IonButton, IonButtons,  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonTitle, IonToolbar, isPlatform } from "@ionic/react";

import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

const IconPicker = () => {
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
               <h1 className="ion-text-center">Icon Picker</h1>
            </IonContent>
        </IonPage>
       
    )
}

export default IconPicker;