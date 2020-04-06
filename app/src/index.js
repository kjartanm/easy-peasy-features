import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import './style/index.css';
import App from './App';
import { FlagProvider, FlagSwitch } from './FeatureFlags';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <FlagProvider>
        <BrowserRouter>
            <FlagSwitch flag="shiny-frontend-v1">
                <FlagSwitch.On>
                    <App version="shiny"/>
                </FlagSwitch.On>
                <FlagSwitch.Off>
                    <App version="tired"/>
                </FlagSwitch.Off>
            </FlagSwitch>
        </BrowserRouter>
    </FlagProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
