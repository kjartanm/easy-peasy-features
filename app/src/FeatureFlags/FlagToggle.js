// eslint-disable-next-line 
import React, { useContext, useState, useMemo, useCallback } from 'react';
import { FlagContext } from './FlagContext';
import { NoAccess } from './NoAccess';
import './toggle.css';

export const FlagToggle = ({ flag, label }) => {
    const { checkFlag, userSettings, setUserSettings, user, timeStamp } = useContext(FlagContext);
    const checkedFlag = useMemo(() => checkFlag(flag, user, timeStamp), [flag, user, timeStamp, checkFlag]);
    const [isSelected] = useState(userSettings[flag] && userSettings[flag].isSelected)
    const handleChange = useCallback(() => {
        const isSelected = !(userSettings[flag] && userSettings[flag].isSelected)
        const currentFlagSetting = userSettings[flag] ? userSettings[flag] : {};
        const newFlagSetting = { ...currentFlagSetting, isSelected };
        setUserSettings({ ...userSettings, [flag]: newFlagSetting });
    }, [flag, userSettings, setUserSettings])

    if (checkedFlag.isSelfSelect) {
        return (
            <div className="toggle-container">
                <input className="toggle-check" id="toggle" type="checkbox" onChange={handleChange} checked={isSelected}></input>
                <label className="toggle-label" htmlFor="toggle">{label}</label>
            </div>
        );
    } else {
        return (
            <NoAccess flag={flag} status={checkedFlag.status}></NoAccess>
        )
    }
}