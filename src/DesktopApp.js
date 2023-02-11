import React from "react";
import Trees from "./desktopComponents/Trees/Trees";


const DesktopApp = () => (
  <div id="desktopApp">
    <Trees 
      treeTitle={"Trees"}
      sectionState={true}
    />
  </div>
);

export default DesktopApp;
