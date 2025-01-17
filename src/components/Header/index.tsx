/* ---------------------------------------
src/components/Header/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './header.css'
import {useNavigate} from "react-router";
import CartCount from "../../modules/Cart/components/cartCount/CartCount.tsx";
import Hamburger from "../Navigation/Hamburger.tsx";



function Header() {
    const navigate = useNavigate();

    return (
        <div className="titleRow">
            <div className="headerLeft">
                <div className="logo"></div>
            </div>
            <div className="hamburgerMenu">
                <Hamburger />
            </div>
            <div className="headerCenter text-medium-color">
                <span className="location"></span>
                <span className="pageTitle">Elynor's Fine Dining</span>
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