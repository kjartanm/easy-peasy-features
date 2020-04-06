// eslint-disable-next-line 
import React, { useContext, useState, useMemo} from 'react';
import { FlagContext } from './FlagContext';
import { FeatureBoundary } from './FeatureBoundary';
import { NoAccess } from './NoAccess';

export const FlagGuard = ({ flag, children }) => {
    const { checkFlag, user, timeStamp } = useContext(FlagContext);
    const [hasError, setHasError] = useState(false);
    const checkedFlag = useMemo(() => checkFlag(flag, user, timeStamp), [flag, user, timeStamp, checkFlag]);
    if (checkedFlag && checkedFlag.value && !hasError) {
        return <FeatureBoundary setHasError={setHasError} flag={flag}>{children}</FeatureBoundary>;
    } else {
        return <NoAccess flag={flag} status={checkedFlag.status}/>
    }
}