import React from "react";
import Trees from "./desktopSections/Trees";


const DesktopApp = () => (
  <div id="desktopApp">
     <div className='desktop'>
            {/* <Title />
            <Controls /> */}
            <Trees 
              treeState={true}/>
            {/* <Branches />
            <Leaves />
            <Modals /> */}
        </div>
  </div>
);

export default DesktopApp;
