/* eslint-disable */
import React, { useRef, useEffect, useContext } from 'react';
import { WiredCard } from "wired-card";
import { WiredIconButton } from "wired-icon-button";
import { WiredCombo } from "wired-combo";
import { WiredItem } from "wired-item";
/* eslint-enable */
import { Link } from 'react-router-dom';
import { FlagContext, FlagSwitch } from './FeatureFlags';
import './style/header.css';

const users = [
    {
        "userid": "user1",
        "name": "Ada Admin, NO",
        "country": "no",
        "role": "admin"
    },
    {
        "userid": "user2",
        "name": "Brita Boss, SE",
        "country": "se",
        "role": "boss"
    },
    {
        "userid": "user3",
        "name": "Cilla Customer, DK",
        "country": "dk",
        "role": "customer"
    },
    {
        "userid": "user4",
        "name": "Dina Dev, FI",
        "country": "fi",
        "role": "developer"
    },
    {
        "userid": "user5",
        "name": "Edna Editor, IS",
        "country": "is",
        "role": "editor"
    },
    {
        "userid": "user6",
        "name": "Fiona Support, FO",
        "country": "fo",
        "role": "support"
    },
    {
        "userid": "user7",
        "name": "Guro Guest, AX",
        "country": "ax",
        "role": "guest"
    },
]

export const Header = () => {

    const selectUser = useRef();
    const { user, setUser, setUserSettings } = useContext(FlagContext);

    useEffect(() => {
        selectUser.current.addEventListener('selected', ev => {
            const newUser = users.find(element => element.userid === ev.detail.selected);
            if (newUser) {
                setUser(newUser);
                setUserSettings({});
            }
        })
    }, [setUser, setUserSettings]);
    return (
        <wired-card class="header">
            <header className="header-container">
                <h2 className="header-item header-heading">My Fake Site!</h2>
                <wired-combo ref={selectUser} className="header-item" selected={user ? user.userid : 'anon'}>
                    <wired-item key="anon" value="anon"> - choose user - </wired-item>
                    {
                        users.map(user => (<wired-item key={user.userid} value={user.userid}>{user.name}</wired-item>))
                    }
                </wired-combo>
                <FlagSwitch flag="profile-page-v1">
                    <FlagSwitch.On>
                        <Link className="header-item" to="/profile"><wired-icon-button><svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg></wired-icon-button><b>Profile</b></Link>
                    </FlagSwitch.On>
                    <FlagSwitch.Off>
                        <wired-icon-button className="header-item" disabled><svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg></wired-icon-button>
                    </FlagSwitch.Off>
                </FlagSwitch>
            </header>
        </wired-card>
    )
}