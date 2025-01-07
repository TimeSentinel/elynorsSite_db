/* ---------------------------------------
src/components/Footer/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './footer.css'
import Themes from "src/modules/Themes";

function Footer () {

    return (
        <div className="footerContainer">
            <div className="footerLeft">
                <div className="theme">
                    <Themes/>
                </div>
            </div>
            <div className="footerCenter">

            </div>
            <div className="footerRight">

            </div>
        </div>
    )
}
export default Footer;
