import './App.css';
import Header from './component/Header.jsx';
import MainMenu from './component/MainMenu.jsx';
import CompSideNav from './component/CompSideNav.jsx';
import SharedVarConstants from './constants/SharedVarConstants.js';
import {useState} from 'react';

function App() {

  const [compType, setCompType] = useState(null);

  const selectCompType = (newCompType) => {
      setCompType(newCompType);
  };

  return (
    <div className="App">
      <Header></Header>
      <MainMenu></MainMenu>
      <CompSideNav compType={compType} sharedVar={SharedVarConstants} selectCompType={selectCompType}></CompSideNav>
      {compType}
    </div>
  );
}

export default App;
