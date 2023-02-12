import React from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";

const DesktopApp = () => (
  <div id="desktopApp">
     <div className='desktop'>
            <Title 
              treeState={true}
            />
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
