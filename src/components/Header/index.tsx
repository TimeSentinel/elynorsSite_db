/* ---------------------------------------
src/components/Header/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './header.css'
import {useNavigate} from "react-router";
import CartCount from "../../modules/Cart/components/cartCount/CartCount.tsx";
import Hamburger from "../Navigation/Hamburger.tsx";
import {useContext} from "react";
import {ctx} from "src/context";



function Header() {
    const navigate = useNavigate();
    const envVars = useContext(ctx).state.style


    return (
        <div className="titleRow">
            <div className="headerLeft">
                <div className="logo"></div>
                <h1 className="pageTitle">Elynor's {envVars.siteTitle}</h1>
            </div>
            <div className="hamburgerMenu">
            <Hamburger />
            </div>
            <div className="headerCenter text-very-dark-color">
                <span className="location"></span>

            </div>
            <div className="headerRight">
                <div className="rightCorner"></div>
                <div className="cartCorner" onClick={() => navigate("/cart")}>
                    <CartCount/>
                </div>
            </div>

        </div>
    )
}

export default Header;