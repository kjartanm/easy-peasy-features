/* eslint-disable */
import React from 'react';
import { WiredCard } from "wired-card";
/* eslint-enable */
import './style/content.css';

export const Content = ({children}) => {
    return (<div className="content"><wired-card class="content-wrapper"><main className="content-container">{children}</main></wired-card></div>);
}