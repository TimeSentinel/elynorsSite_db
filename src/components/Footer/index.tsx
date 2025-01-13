/* ---------------------------------------
src/components/Footer/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './footer.css'
import Themes from "src/modules/Themes";

function Footer () {

    return (
        <div className="footerContainer background-soft-color border-medium-color">
            <div className="footerLeft">
                <div className="theme">
                    <Themes/>
                </div>
            </div>
            <div className="footerCenter">
                <p>&copy;2025 Lance Stubblefield</p>
            </div>
            <div className="footerRight">

            </div>
        </div>
    )
}
export default Footer;
