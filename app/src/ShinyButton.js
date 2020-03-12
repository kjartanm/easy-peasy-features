import React, { useContext } from 'react';
import { AnalyticsContext } from './FeatureFlags';

export const ShinyButton = () => {

    const { doAnalytics } = useContext(AnalyticsContext);

    const pressMyButton = () => {
        doAnalytics("add 1 for 'press my button'")
    }

    return (<button onClick={pressMyButton}>PRESS MY BUTTON</button>);
}