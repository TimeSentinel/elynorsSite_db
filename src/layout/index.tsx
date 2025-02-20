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
            <div className="layoutContainer">
                <div className="layoutSidebar"><Sidebar/></div>
                <div className="layoutBody background-light-color">
                    <div className="layoutHeader border-soft-color background-light-color"><Header/></div>
                    <div className="layoutContent">
                        <section>
                            {children}
                        </section>
                    </div>
                    <div className="layoutFooter"><Footer/></div>
                </div>
            </div>
        </main>
    )
}
export {Layout}