import './App.css';
import Header from './component/Header.jsx';
import MainMenu from './component/MainMenu.jsx';
import CompSideNav from './component/CompSideNav.jsx';
import SharedVarConstants from './constants/SharedVarConstants.js';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainMenu></MainMenu>
      <CompSideNav sharedVar={SharedVarConstants}></CompSideNav>
    </div>
  );
}

export default App;
