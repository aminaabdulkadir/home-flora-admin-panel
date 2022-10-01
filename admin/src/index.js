import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DarkModeContextProvider } from './context/darkModeContext';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <DarkModeContextProvider>
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </DarkModeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
