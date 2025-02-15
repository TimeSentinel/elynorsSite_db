/* ---------------------------------------
src/components/Navigation/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import {useState, useEffect, useRef} from "react";
import "./navigation.css"
import {useNavigate} from "react-router";

interface navbarInterface {
    title: string,
    link: string,
    alt: string,
    enabled: string,
    level2: [{
        title: string,
        link: string,
        alt: string,
        enabled: string,
        level3: []
    }]
}


function Navigation() {
    // ------------------ navigation --------------------------------------------------

    const navigate = useNavigate();

    function navClick(page: string) {
        navigate(page);
    }


    const errorMsg = useRef<string>("");
    const [navbarElements, setNavbarElements] = useState<navbarInterface[]>([{
        title: "",
        link: "",
        alt: "",
        enabled: "",
        level2: [{
            title: "",
            link: "",
            alt: "",
            enabled: "",
            level3: []
        }]
    }]);

    useEffect(() => {
        fetch("/navigation/navigation.json") //     <---!!!Path to themes list json file!!!
            .then(res => res.json())
            .then(data => {
                setNavbarElements(data.level1);
            })
            .catch(error => {
                errorMsg.current = "navigation/navigation.json: " + error.message;
                console.log("error: " + errorMsg.current);
            })
    }, [])

    return (
        <div className="navbar">
            <ul>
                {navbarElements.map((item, i) => {
                    return (
                        <div key={i}>
                            <hr className="navHR border-bright-color"/>
                            <li>
                                <button className={
                                    item.enabled === "no" ? "level1 disabled text-medium-shade" :
                                        location.pathname === item.link
                                            ? "level1 Selected text-bright-color background-dark-color border-bright-color"
                                            : "level1 enabled text-dark-color "
                                }
                                        onClick={() => item.enabled === "yes" && navClick(item.link)}>
                                    {item.title}
                                </button>
                            </li>
                            {
                                item.level2.length > 0 &&
                                <ul>
                                    {item.level2.map((item2, j) => {
                                        return (
                                            <li key={j}>
                                                <button className={
                                                    item2.enabled === "no" ? "level1 disabled text-medium-shade" :
                                                        location.pathname === item2.link
                                                            ? "level1 Selected text-bright-color background-dark-color border-medium-color"
                                                            : "level1 enabled text-dark-color "
                                                }
                                                        onClick={() => item2.enabled === "yes" && navClick(item2.link)}>
                                                    {item2.title}
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navigation;

