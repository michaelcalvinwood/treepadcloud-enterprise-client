import { IonButton, IonButtons,  IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonPage, IonSearchbar, IonTitle, IonToolbar, isPlatform } from "@ionic/react";

import { add } from 'ionicons/icons';
import treePadIcon from '../assets/icons/treepadcloud-icon-white.svg';

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
                            <IonButton  color="light" routerLink="/add-tree">
                                <IonIcon slot="icon-only" icon={add} />
                            </IonButton>
                        </IonButtons>
                    )}
                   
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonSearchbar 
                    // onIonChange={e => setSearch(e.detail.value || '')}
                    className='trees__search ion-text-left' 
                    placeholder=''
                    />
               {!isPlatform('ios') && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton routerLink="/add-tree">
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                     )}
            </IonContent>
        </IonPage>
       
    )
}

export default Trees;