// eslint-disable-next-line 
import React, { useEffect } from 'react';
import {useLocalStorage} from './hooks';
import { FlagContext } from './FlagContext';
import { flagEnabled, flagExists, matchUser, checkThreshold, checkSelfSelect } from './FlagChecks';

export const FlagProvider = (props) => {
    const [timeStamp, setTimeStamp] = useLocalStorage('timeStamp', Date.now());
    const [user, setUser] = useLocalStorage('user', {});
    const [userSettings, setUserSettings] = useLocalStorage('userSettings', {});
    const [flags, setFlags] = useLocalStorage('flags', null);
    console.log("user", user)
    const checkFlag = flag => {
        let checkedFlag = flagExists(flag, flags);
        if (!checkedFlag.value) return checkedFlag;

        const flagToCheck = flags[flag];

        checkedFlag = flagEnabled(flag, flagToCheck);
        if (!checkedFlag.value) return checkedFlag;

        checkedFlag = matchUser(flagToCheck, user);
        if (!checkedFlag.value) return checkedFlag;

        checkedFlag = checkThreshold(flag, flagToCheck, userSettings, setUserSettings);
        if (!checkedFlag.value) return checkedFlag;

        checkedFlag = checkSelfSelect(flag, flagToCheck, userSettings);

        return checkedFlag;
    }

    useEffect(() => {
        const updateFlags = (storageFlags) => {
            if (storageFlags &&
                storageFlags.timestamp &&
                storageFlags.timestamp !== timeStamp) {
                let tempFlags = {}
                storageFlags.feature.forEach(feature => {
                    tempFlags[feature.flag] = feature;
                });
                setFlags(tempFlags);
                setTimeStamp(storageFlags.timestamp);
            }
        }
        updateFlags(JSON.parse(window.localStorage.getItem('EasyPeasyFeatures')));
        const listener = e => {
            if (e.key === 'EasyPeasyFeatures') {
                updateFlags(JSON.parse(e.newValue));
            }
        }
        window.addEventListener('storage', listener);
        return () => window.removeEventListener('storage', listener);
    }, [timeStamp])

    return (
        <FlagContext.Provider value={{
            timeStamp,
            checkFlag,
            setUser,
            user,
            userSettings,
            setUserSettings
        }}>
            {props.children}
        </FlagContext.Provider>
    )
}