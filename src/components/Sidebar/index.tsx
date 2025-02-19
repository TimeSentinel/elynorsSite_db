/* ---------------------------------------
src/components/Header/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */
import './sidebar.css'
import Navigation from "src/components/Navigation";

function Sidebar() {

    return (
        <div className="sidebarContainer background-soft-color  border-medium-color">
            <div className="logo"></div>
            <div className="sideHeader text-very-dark-color">
            </div>
            <div className="navbar">
                {/*<hr className="sideHR border-light-color"/>*/}
                <Navigation/>
            </div>

        </div>
    )

}

export default Sidebar;
