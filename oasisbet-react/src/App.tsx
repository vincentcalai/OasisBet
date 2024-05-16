import './App.css';
import OddsLanding from './component/odds/OddsLanding.tsx';
import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import ResultLanding from './component/result/ResultLanding.tsx';
import AccountLanding from './component/account/AccountLanding.tsx';
import RootMenu from './component/RootMenu.tsx';

function App() {

  const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/odds" replace />
    },
    {
        path: "/",
        element: <RootMenu />,
        children: [
            {
                path: "odds",
                element: <OddsLanding />,
            }, {
                path: "result",
                element: <ResultLanding />,
            }, {
                path: "account",
                element: <AccountLanding />,
            },
            {
                path: "*",
                element: <Navigate to="/odds" replace />,
            }
        ],
    },
  ]);

  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
