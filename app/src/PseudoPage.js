/* eslint-disable */
import React from 'react';
import { WiredCard } from "wired-card";
/* eslint-enable */
import './style/message.css';

export const PseudoPage = ({ pageTitle='Something' }) => {
    return (
        <>
            <h2>This could be a/an {pageTitle}-page</h2>
            <wired-card class="message">
                <h4>This is a Feature Flags demo/prototype</h4>
                <ul>
                    <li>For a writeup, see <a href="https://medium.com/@kjartanmuller/feature-flags-an-explainer-and-interactive-demo-using-react-and-mavo-5f84eed3d111">https://medium.com/@kjartanmuller/feature-flags-an-explainer-and-interactive-demo-using-react-and-mavo-5f84eed3d111</a></li>
                    <li>For github repo, see <a href="https://github.com/kjartanm/easy-peasy-features">https://github.com/kjartanm/easy-peasy-features</a></li>
                    <li>For the Flag-dashboard, see <a href="/features" target="_blank">Easy Peasy Featureflags</a></li>
                </ul>
                <p>It currently uses 3 active flags:</p>
                <ul>
                    <li>A flag for a new support-chat feature</li>
                    <li>A flag for a new app-experience</li>
                    <li>A flag for a new profile page</li>
                </ul>
                <p>Select different users to see the flags in action. Go to the <a href="/features" target="_blank">dashboard</a> to change flag-settings.</p>
                <p>The demo/prototype uses local-storage for 'backend', so you should see the effect of changes immediately. Remember to save.</p>
            </wired-card>
        </>
    )
}