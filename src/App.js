import DesktopApp from "./DesktopApp";
import MobileApp from "./MobileApp";

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const setWidth = () => {
    setWindowWidth(window.innerWidth);
  }
  
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  })

  return (
      <div id="app">
        {windowWidth >= 1280 && <DesktopApp />}
        {windowWidth < 1280 && <MobileApp />}
      </div>
  )
};

export default App;
