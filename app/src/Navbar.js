/* eslint-disable */
import React, { useRef, useEffect, useContext } from 'react';
import { WiredCard } from "wired-card";
import { WiredIconButton } from "wired-icon-button";
/* eslint-enable */
import { FlagToggle } from './FeatureFlags';
import { Link } from 'react-router-dom';
import './style/navbar.css';


export const Navbar = () => {
    return (
        <wired-card class="navbar">
            <nav className="navbar-container">
                <Link className="navbar-item" to="/">Home </Link>
                <Link className="navbar-item" to="/about">About Us </Link>
                <Link className="navbar-item" to="/shop">Shop Now </Link>
                <FlagToggle className="navbar-item" flag="shiny-frontend-v1" label="Try my shiny new look and feel!"></FlagToggle>
            </nav>
        </wired-card>
    );
};