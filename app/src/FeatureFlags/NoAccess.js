import React from 'react';

export const NoAccess = ({flag, status, switchState = 'Not applicable'}) => {
    return (
        <span style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: `<!-- Switch ${switchState} for ${flag}. Status: ${status} -->` }}></span>
    )
}