import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/index.ts';

const store = createStore(
  rootReducer
)

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
