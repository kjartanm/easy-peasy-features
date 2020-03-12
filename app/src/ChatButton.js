/* eslint-disable */
import React from 'react';
import { WiredIconButton } from "wired-icon-button";
import { WiredCard } from "wired-card";
/* eslint-enable */
import './style/chatbutton.css';

export const ChatButton = () => {

    return (
        <wired-card  elevation="4" class="chat-container">
            <label>Have a nice chat with our Supportbot! </label>
            <wired-icon-button class="header-item"><svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg></wired-icon-button>
        </wired-card>
    )
}