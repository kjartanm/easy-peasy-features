// eslint-disable-next-line 
import React, { useEffect } from 'react';
import { useLocalStorage } from './hooks';
import { FlagContext } from './FlagContext';
import { flagEnabled, flagExists, matchUser, checkThreshold, checkSelfSelect } from './FlagChecks';

const mockData = {
    "project-name": "My test project",
    "project-url": "https://my-test-project",
    "timestamp": 5465465465465,
    "feature": [
        {
            "label": "New frontend",
            "flag": "shiny-frontend-v1",
            "description": "New frontend to improve metrics by ...",
            "threshold": 100,
            "self-select": true,
            "enabled": true,
            "deprecated": false,
            "expires": "2020-05-01",
            "selectors": {
                "country": ["no", "dk"],
                "role": ["all"],
                "userid": ["all"]
            }

        },
        {
            "label": "Add customer profile-page",
            "flag": "profile-page-v1",
            "description": "A customer profile-page to improve metrics by ...",
            "threshold": 100,
            "self-select": false,
            "enabled": true,
            "deprecated": false,
            "expires": "2020-12-01",
            "selectors": {
                "country": ["all"],
                "role": ["customer"],
                "userid": ["all"]
            }
        }, {
            "label": "Add support chat",
            "flag": "support-chat-v1",
            "description": "A support chat to improve metrics by ...",
            "threshold": 100,
            "self-select": false,
            "enabled": true,
            "deprecated": false,
            "expires": "2020-12-01",
            "selectors": {
                "country": ["se"],
                "role": ["all"],
                "userid": ["all"]
            }
        }
    ]
};

export const FlagProvider = (props) => {
    const [timeStamp, setTimeStamp] = useLocalStorage('timeStamp', Date.now());
    const [user, setUser] = useLocalStorage('user', {
        "userid": "user1",
        "name": "Ada Admin, NO",
        "country": "no",
        "role": "admin"
    });
    const [userSettings, setUserSettings] = useLocalStorage('userSettings', {});
    const [flags, setFlags] = useLocalStorage('flags', mockData);
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
    }, [timeStamp, setFlags, setTimeStamp])

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