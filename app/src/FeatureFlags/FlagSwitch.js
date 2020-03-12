// eslint-disable-next-line 
import React, { createContext, useContext, useState, useMemo } from 'react';
import { FlagContext } from './FlagContext';
import { FeatureBoundary } from './FeatureBoundary';
import { NoAccess } from './NoAccess';

const FlagSwitchContext = createContext();

const _FlagSwitch = ({ flag, children }) => {
    const [hasError, setHasError] = useState(false);
    const { checkFlag, user, timeStamp } = useContext(FlagContext);
    const checkedFlag = useMemo(() => checkFlag(flag, user, timeStamp), [flag, user, timeStamp, checkFlag]);
    return (<FlagSwitchContext.Provider value={{ flag, status: checkedFlag.status, on: checkedFlag.value, hasError, setHasError }}>{children}</FlagSwitchContext.Provider>);
}

function On({ children }) {
    const { on, flag, status, hasError, setHasError } = useContext(FlagSwitchContext)
    return (on || hasError) ? <FeatureBoundary flag={flag} setHasError={setHasError} switchState="On">{children}</FeatureBoundary> : <NoAccess flag={flag} status={status} switchState="On" />;
}

function Off({ children }) {
    const { on, flag, status, hasError, setHasError } = useContext(FlagSwitchContext)
    return (on && !hasError) ? <NoAccess flag={flag} status={status} switchState="Off" /> : <FeatureBoundary setHasError={setHasError} flag={flag} switchState="Off">{children}</FeatureBoundary>;
}

_FlagSwitch.On = On;
_FlagSwitch.Off = Off;

export const FlagSwitch = _FlagSwitch;