import React from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";
import Branches from "./desktopSections/Branches";
import Leaves from "./desktopSections/Leaves";

const DesktopApp = () => (
  <div id="desktopApp">
     <div className='desktop'>
            <Title 
              treesState={true}
            />
            <Controls 
              controlsState={true}
              treesState={true}
            />
            <Trees 
              treesState={true}
            />
            <Branches 
              branchesState={true}
              treesState={true}
              controlsState={true}
              treeName={"test"}
            />
            <Leaves 
              controlsState={true}
              treesState={true}
              branchesState={true}  
            />
            {/* <Modals /> */}
        </div>
  </div>
);

export default DesktopApp;
