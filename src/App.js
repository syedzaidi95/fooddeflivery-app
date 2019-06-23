import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import { store, persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import desktopImage from './Images/background/home-page.jpg'
import AppRouter from './config/ReactRouter'

// import firebase from './config/firebae'
// import mobileImage from './Images/background/login-signup screen.jpg'

export default function App() {
const imageUrl = window.innerWidth >= 650 ? desktopImage : desktopImage;
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <img className='bgImg' src={imageUrl} alt='bgImg'/>
      <div className='mainDiv'>
      <AppRouter />
      </div>
    </div>
    </PersistGate>
    </Provider>
  );
}

