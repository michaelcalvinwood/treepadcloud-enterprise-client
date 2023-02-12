import React, { useState } from "react";
import Controls from "./desktopSections/Controls";
import Trees from "./desktopSections/Trees";
import Title from "./desktopSections/Title";
import Branches from "./desktopSections/Branches";
import Leaves from "./desktopSections/Leaves";

const DesktopApp = () => {

  const [sections, setSections] = useState({
    controls: false,
    trees: true,
    branches: true,
    leaves: true
  })

  const toggleSection = section => {
    console.log('toggleSection', section);
    let modified = sections;
    sections[section] = !sections[section];
    setSections({...modified});
    console.log(modified);
  }

  return (
    <div id="desktopApp">
      <div className='desktop'>
              <Title 
                controlsState={sections.controls}
                treesState={sections.trees}
                toggleSection={toggleSection}
              />
              <Controls 
                controlsState={sections.controls}
                treesState={sections.trees}
                toggleSection={toggleSection}
              />
              <Trees 
                treesState={sections.trees}
              />
              <Branches 
                branchesState={sections.branches}
                treesState={sections.trees}
                controlsState={sections.controls}
                treeName={"test"}
              />
              <Leaves 
                controlsState={sections.controls}
                treesState={sections.trees}
                branchesState={sections.branches}  
              />
              {/* <Modals /> */}
          </div>
    </div>
  );
}
export default DesktopApp;
