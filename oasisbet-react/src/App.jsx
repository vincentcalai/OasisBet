import './App.css';
import Header from './component/Header.jsx';
import MainMenu from './component/MainMenu.jsx';
import SharedVarConstants from './constants/SharedVarConstants.js';
import OddsLanding from './component/OddsLanding.jsx';

function App() {

  return (
    <div className="App">
      <Header></Header>
      <MainMenu></MainMenu>
      <OddsLanding sharedVar={SharedVarConstants}></OddsLanding>
    </div>
  );
}

export default App;
