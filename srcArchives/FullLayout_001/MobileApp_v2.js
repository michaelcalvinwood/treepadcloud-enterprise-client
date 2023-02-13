import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact, IonTabBar, IonIcon, IonLabel, IonTabButton } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


import TreeIcon from './assets/icons/tree.svg';
import BranchesIcon from './assets/icons/branch.svg';
import LeafIcon from './assets/icons/leaf.svg';
import SettingsIcon from './assets/icons/settings.svg';

import Trees from './mobilePages/Trees';
import Branches from './mobilePages/Branches';
import Leaves from './mobilePages/Leaves';
import Settings from './mobilePages/Settings';

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
          <Route path="/branches">
            <Branches />
          </Route>

          {/* Route #3 */}
          <Route path="/leaves">
            <Leaves />
          </Route>

          {/* Route #4 */}
          <Route path="/settings">
            <Settings />
          </Route>

          {/* Default Route */}
          <Redirect to="/trees" />
      </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          {/* Note: The tab prop in IonTabButton is just an identifier. Choose anything you like. */}
          
          {/* Tab #1*/}
          <IonTabButton href="/trees" tab="trees"> 
            <IonIcon icon={TreeIcon} />
            <IonLabel>Trees</IonLabel>
          </IonTabButton>

          {/* Tab #2*/}
          <IonTabButton href="/branches" tab="branches">
          <IonIcon icon={BranchesIcon} />
          <IonLabel>Branches</IonLabel>
          </IonTabButton>

           {/* Tab #3*/}
           <IonTabButton href="/leaves" tab="leaves">
            <IonIcon icon={LeafIcon} />
            <IonLabel>Leaves</IonLabel>
           </IonTabButton>

           {/* Tab #4*/}
           <IonTabButton href="/settings" tab="settings">
            <IonIcon icon={SettingsIcon} />
            <IonLabel>Settings</IonLabel>
           </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default MobileApp;
