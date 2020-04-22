/* eslint-disable */
import React from 'react';
import { WiredCard } from "wired-card";
/* eslint-enable */
import {ErrorMaker} from './ErrorMaker';
import {ShinyButton} from './ShinyButton';
import {FlagSwitch} from './FeatureFlags'
import './style/message.css';

export const PseudoPageWithError = () => {
    return (
        <>
            <h2>This is an TestPage</h2>
            <wired-card class="message">
                <FlagSwitch flag="shiny-frontend-v1">
                    <FlagSwitch.On>
                        <h1>On</h1>
                        <ErrorMaker />
                    </FlagSwitch.On>
                    <FlagSwitch.Off>
                        <h1>Off</h1>
                    </FlagSwitch.Off>
                </FlagSwitch>
            </wired-card>
        </>
    )
}