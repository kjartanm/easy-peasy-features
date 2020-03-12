const OKStatus =  { "value": true, "status": "enabled"};

const isIn = (item, array) => {
    return array.indexOf(item) !== -1;
}

export const flagExists = (flag, flags) => {
    if (!flags) {
        return { "value": false, "status": "no-flags-available" };
    }
    if (!flags[flag]) {
        console.error(`Flag ${flag} is not part of the available feature flags.`);
        return { "value": false, "status": "no-flag" };
    }
    return OKStatus;
}

export const flagEnabled = (flag, flagToCheck) => {
    if (!flagToCheck.enabled) return { "value": false, "status": "disabled" };
    if (flagToCheck.deprecated) {
        console.warn(`Flag ${flag} is deprecated but still used.`);
    }
    return OKStatus;
}

export const matchUser = (flagToCheck, user) => {
    let isMatch = true;
    for (let key in flagToCheck.selectors) {
        const keySelectors = flagToCheck.selectors[key] || [];
        isMatch = isMatch && (isIn('all', keySelectors) || isIn(user[key], keySelectors));
    }
    return (isMatch) ?  OKStatus : { "value": false, "status": "no-match" };
}

export const checkThreshold = (flag, flagToCheck, userSettings, setUserSettings) => {
    if (Number(flagToCheck['threshold']) !== 100) {
        let matchTreshold = Math.floor(Math.random() * 100);
        if (!userSettings[flag] || !userSettings[flag].matchTreshold) {
            const currentFlagSetting = userSettings[flag] ? userSettings[flag] : {};
            const newFlagSetting = { ...currentFlagSetting, matchTreshold };
            setUserSettings({ ...userSettings, [flag]: newFlagSetting });
        }else{
            matchTreshold = userSettings[flag].matchTreshold;
        }

        if(matchTreshold > Number(flagToCheck['threshold'])){
            return { "value": false, "status": "above-threshold" }
        }
    }
    return OKStatus;
}

export const checkSelfSelect  = (flag, flagToCheck, userSettings) => {
    const isSelfSelect = true;
    if (flagToCheck['self-select']) {
        if (!userSettings[flag] || !userSettings[flag].isSelected) {
            return { "value": false, "status": "not-selected", isSelfSelect };
        } else if (userSettings[flag] && userSettings[flag].isSelected) {
            return { ...OKStatus, isSelfSelect };
        }
    }else{
        return OKStatus;
    }
}
