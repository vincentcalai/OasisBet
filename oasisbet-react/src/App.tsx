import './App.css';
import Header from './component/Header.tsx';
import MainMenu from './component/MainMenu.tsx';
import OddsLanding from './component/OddsLanding.tsx';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <OddsLanding/>,
      children: [
        {
          path: "odds",
          element: <OddsLanding/>,
        }, {
          path: "result",
          element: <OddsLanding/>,
        }, {
          path: "account",
          element: <OddsLanding/>,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <Header></Header>
      <MainMenu></MainMenu>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
