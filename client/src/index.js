import React from 'react';

import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import App from './App';
import'./styles/index.scss';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const store = configureStore(
    { reducer: rootReducer }, applyMiddleware()
)

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={{store}}><App /></Provider>


);