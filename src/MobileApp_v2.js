import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact, IonTabBar, IonIcon, IonLabel, IonTabButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './mobilePages/Home';
import BadMemories from './mobilePages/BadMemories';

import { happy, sad } from 'ionicons/icons';
import TreeIcon from './assets/icons/tree.svg';
import Trees from './mobilePages/Trees';

const MobileApp = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* One route per tab */}
          
          {/* Route #1 */}
          <Route path="/trees">
           <Trees />
          </Route>

          {/* Route #2 */}
          <Route path="/bad-memories">
            <BadMemories />
          </Route>

          {/* Default Route */}
          <Redirect to="/good-memories" />
      </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          {/* Note: The tab prop in IonTabButton is just an identifier. Choose anything you like. */}
          
          {/* Tab #1*/}
          <IonTabButton href="/trees" tab="good"> 
            <IonIcon icon={TreeIcon} />
            <IonLabel>Trees</IonLabel>
          </IonTabButton>

          {/* Tab #2*/}
          <IonTabButton href="/bad-memories" tab="bad">
          <IonIcon icon={sad} />
          <IonLabel>Sad Memories</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default MobileApp;
