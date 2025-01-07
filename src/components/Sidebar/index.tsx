/* ---------------------------------------
src/components/Header/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */
import './sidebar.css'
import Themes from "src/modules/Themes";
import Navigation from "src/components/Navigation";

function Sidebar() {

    return (
        <div className="sidebarContainer background-soft-color  border-medium-color">
            <div className="sideHeader text-very-dark-color">

            </div>
            <div className="navbar">
                <hr className="sideHR border-medium-color"/>

                <Navigation />

            </div>
            <div className="theme">
                <Themes />
            </div>
        </div>
    )

}

export default Sidebar;
