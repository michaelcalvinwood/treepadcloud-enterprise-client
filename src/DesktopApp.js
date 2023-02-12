import React from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";


const DesktopApp = () => (
  <div id="desktopApp">
     <div className='desktop'>
            {/* <Title /> */}
            <Controls 
              controlsState={true}
              treesState={true}
            />
            <Trees 
              treeState={true}
            />
            {/* <Branches />
            <Leaves />
            <Modals /> */}
        </div>
  </div>
);

export default DesktopApp;
