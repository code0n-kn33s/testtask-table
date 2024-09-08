import { useState } from 'react'

import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { useSelector } from "react-redux";

import adminImg from './images.png';

export default function Main(params) {
    const isAuth = useSelector(store => store.auth.isAuth);

    return (
        <nav className="main-nav__wrapper">
            <div className="main-nav-logo">
            
            </div>
            <ul className="main-nav__first-lvl">
                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="main">
                        <span>
                            Головна
                        </span>
                    </NavLink>
                </li>
                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="about">
                        <span>
                            Про нас
                        </span>
                    </NavLink>
                </li>

                <li className="main-nav__first-lvl-item">
                    <NavLink className="link" to="contacts">
                        <span>
                            Контакти
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}