// eslint-disable-next-line 
import React, { useContext, useMemo} from 'react';
import { FlagContext } from './FlagContext';

export const FlagGuard = ({ flag, children }) => {
    const { checkFlag, user, timeStamp } = useContext(FlagContext);
    const checkedFlag = useMemo(() => checkFlag(flag, user, timeStamp), [flag, user, timeStamp, checkFlag]);
    if (checkedFlag && checkedFlag.value) {
        return children;
    } else {
        return (
            <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- No entry for ${flag}. Status: ${checkedFlag.status} -->` }}></span>
        )
    }
}