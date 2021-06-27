import React from 'react';
import {
	BrowserRouter as Router, useHistory
} from 'react-router-dom';
import Routes from "./routes"
import {Provider} from "react-redux"
import configureStore from './store';
import { PersistGate } from "redux-persist/integration/react";
import initialStore from "./store/Reducers/inital-state";
import { ToastProvider, useToasts } from 'react-toast-notifications'

// SEGMENT INITIALIZED
const App = () => {
  
  let storeValues = configureStore(initialStore);

  return (
      <Provider store={storeValues.store}>
        <PersistGate loading={null} persistor={storeValues.persistor}>
          <ToastProvider>
              <Router>
                  <Routes />
              </Router>
          </ToastProvider>
        </PersistGate>
      </Provider>
  );
}

export default App;
