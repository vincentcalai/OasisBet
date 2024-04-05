import './App.css';
import Header from './component/Header.tsx';
import MainMenu from './component/MainMenu.tsx';
import SharedVarConstants from './constants/SharedVarConstants.js';
import OddsLanding from './component/OddsLanding.tsx';
import React from 'react';

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
