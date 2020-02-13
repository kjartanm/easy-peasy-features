import React, { useState } from 'react';
import FeatureFlagContext from './FeatureFlagContext';

export const FeatureFlagProvider = (props) => {
    const [timeStamp, setTimeStamp] = useState(Date.now());
    const [user, setUser] = useState({});
    const [flags, setFlags] = useState({});
    const updateFlags = (storageFlags) => {
        if (storageFlags &&
            storageFlags.timestamp &&
            storageFlags.timestamp != timeStamp) {
            setTimeStamp(storageFlags.timestamp);
            let flags = {}
            storageFlags.flags.forEach(flag => {
                flags[flag.key] = flag;
            });
            setFlags(flags);
        }
    }

    useEffect(() => {
        updateFlags(window.localStorage.getItem('EasyPeasyFeatures'));
        const listener = e => {
            if (e.key === 'EasyPeasyFeatures') {
                updateFlags(e.newValue);
            }
        }
        window.addEventListener('storage', listener);
        return () => window.removeEventListener('storage', listener);
    }, [])

    return (
        <FeatureFlagContext.Provider value={{ user, setUser, flags, setFlags }}>
            {props.children}
        </FeatureFlagContext.Provider>
    )
}