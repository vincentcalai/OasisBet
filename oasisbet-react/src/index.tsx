import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Provider} from 'react-redux';
import rootReducer from './store/index.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
})

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
