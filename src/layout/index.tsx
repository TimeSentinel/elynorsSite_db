/* LAYOUT
################################### Restaurant Functional Module ###################################
/src/containers/Cart/stateReducers.tsx    ::: primary application container
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import {ReactNode} from "react";
import "./layout.css";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Header from "src/components/Header";

interface Props {
    children: ReactNode;
}

const Layout = ({children}: Props) => {

    return (
        <main>
            <div className="container">
                <div className="sidebar"><Sidebar/></div>
                <div className="mainBody background-light-color">
                    <div className="header border-soft-color background-light-color"><Header/></div>
                    <div className="pageData">
                        <section>
                            {children}
                        </section>
                    </div>
                    <div className="footer"><Footer/></div>
                </div>
            </div>
        </main>
    )
}
export {Layout}