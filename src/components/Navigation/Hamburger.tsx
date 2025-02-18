/* ---------------------------------------
src/components/Navigation/Hamburger.tsx
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


function Hamburger() {
    const [displayMain, setDisplayMain] = useState<boolean>(false);

    function toggleMain() {
        setDisplayMain(!displayMain);
    }

    // ------------------ navigation --------------------------------------------------
    const navigate = useNavigate();

    function navClick(key: string) {
        navigate(key)
        setDisplayMain(false);
    }

//---------------------------------------------------------------------------------


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

        <div className="hamburger">
            <div className="menuRow">
                <div id="hamburgerIcon"
                     onClick={toggleMain}>
                    <div className="iconBar background-dark-color border-very-dark-color"></div>
                    <div className="iconBar background-dark-color border-very-dark-color"></div>
                    <div className="iconBar background-dark-color border-very-dark-color"></div>
                </div>
            </div>
            {displayMain && (
                <ul className="hamburgerUL background-soft-color text-medium-color">
                    {navbarElements.map((item, i) => {
                        return (
                            <div key={i}>
                                <li>
                                    <button className={
                                        item.enabled === "no" ? "level1 disabled text-medium-shade background-light-shade" :
                                            location.pathname === item.link
                                                ? "level1 Selected text-bright-color background-dark-color"
                                                : "level1 enabled text-medium-color "
                                    }
                                            onClick={() => item.enabled === "yes" && navClick(item.link)}>
                                        {item.title}
                                    </button>
                                </li>
                                {
                                    item.level2.length > 0 &&
                                    <ul className="hamburgerUL2 background-soft-color text-light-color">
                                        {item.level2.map((item2, j) => {
                                            return <li key={j}
                                                       className={item2.enabled === "no" ? "level2 disabled text-medium-shade background-light-shade" :
                                                           "level2 enabled text-medium-color "}>
                                                {item2.title}</li>
                                        })}
                                    </ul>
                                }
                            </div>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Hamburger;

