/* ---------------------------------------
src/components/Header/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */
import './sidebar.css'
import Themes from "src/modules/Themes";

function Sidebar() {

    return (
        <div className="sidebarContainer background-soft-color  border-medium-color">
            <div className="sideHeader text-very-dark-color">
                side header.
            </div>
            <div className="navbar">
                <h2 className="text-very-dark-color">navbar</h2>

                <ul>
                    <li className="navItem text-dark-color">menu item</li>
                    <li className="navItem text-very-dark-color">menu item</li>
                    <li className="navItem text-very-dark-color">menu item</li>
                    <li className="navItem text-very-dark-color">
                        <ul>
                            <li className="navSubItem text-dark-color">sub item</li>
                            <li className="navSubItem text-dark-color">sub item</li>
                            <li className="navSubItem text-dark-color">sub item</li>
                            <li className="navSubItem text-dark-color">sub item</li>
                        </ul>
                    </li>
                    <li className="navItem text-very-dark-color">menu item</li>
                </ul>

            </div>
            <div className="theme">
                <Themes />
            </div>
        </div>
    )

}

export default Sidebar;
