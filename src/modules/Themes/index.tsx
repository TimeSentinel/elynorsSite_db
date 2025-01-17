/* Themes Main Component
################################### Restaurant Functional Module ###################################
Themes
/modules/Themes/index.tsx    ::: CSS Themes; requires theme packages
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import React, {useContext, useEffect, useRef, useState} from "react";
import {ctx} from "src/context";
import './themes.css';
import useSWR from "swr";

// --------------------------------------
//region vv---------- INTERFACES ----------vv

interface themeListDataInterface {
    uuid: string,
    name: string,
    text: string,
    background: string,
    path: string,
}

interface themeColorsInterface {
    lightColor: string,
    softColor: string,
    mediumColor: string,
    darkColor: string,
    veryDarkColor: string,
    brightColor: string,
    okColor: string,
    highlightColor: string,
    alertColor: string,
    lightShade: string,
    mediumShade: string,
    darkShade: string,
    veryDarkShade: string,
}

interface themeSettingsInterface {
    logoUrl: string,
}

interface themeRootInterface {
    body: string,
    h1: string,
    h2: string,
    h3: string,
    h4: string,
    h5: string,
    font: string,
    fontSize: string,
    button: string,
    p: string,
}

interface themeCatalogInterface {
    theme: string,
    colors: themeColorsInterface,
    settings: themeSettingsInterface,
    root: themeRootInterface,
}

//endregion
// --------------------------------------

function ThemeSelector(): React.JSX.Element {
    // --------------------------------------
    //region vv---------- INITIALIZATION ----------vv
    const cssStyle = useContext(ctx).state.cssStyle;
    const cssDispatch = useContext(ctx).dispatch;
    const cssUUID = useContext(ctx).localState.cssUUID;
    const localDispatch = useContext(ctx).localDispatch
    const [themes, setThemes] = useState<themeListDataInterface[]>([{
        uuid: "",
        name: "",
        text: "",
        background: "",
        path: ""
    }]);
    const errorMsg = useRef<string>("");

    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) =>
            fetch(url, init).then((res) => res.json());
    const {
        data: themes,
        error: Error,
        isValidating: Validate,
    } = useSWR({url: "http://localhost:3001/products", init: {method: "GET"}}, fetcher);
    if (Validate) return <div className="loading">Loading themes...</div>;
    if (Error) return <div className="failed">Failed to load the themes</div>;

    setThemes(themes);


    // !!! Update Theme when cssUUID changes
    useEffect(() => {
        const fetchTheme = (uuid: string) => {
            const curPath: string =
                themes.find((item: themeListDataInterface) => item.uuid === uuid)?.path
                ?? "/themes/default"    //              <----  path to default theme folder!!!

            return fetch(curPath + "/theme.json") //    <---- !!!name of individual theme descriptors
                .then(res => res.json())
                .catch(error => errorMsg.current = "<name>/theme.json: " + error.message)
        }

        const updateCSS = (curTheme: themeCatalogInterface) => {
            if (curTheme.root === undefined) return;

            const css =
                // --------------------------------------
                //region vv------ Current Style Set <css> ------vv
                // ---------------------- Root ----------------------
                `body { ${curTheme.root.body};
                 font-family: ${curTheme.root.font};
                 font-size: ${curTheme.root.fontSize};
                 } ` +
                `h1 { ${curTheme.root.h1}; } ` +
                `h2 { ${curTheme.root.h2}; } ` +
                `h3 { ${curTheme.root.h3}; } ` +
                `h4 { ${curTheme.root.h4}; } ` +
                `h5 { ${curTheme.root.h5}; } ` +
                `button { ${curTheme.root.button}; } ` +
                `p { ${curTheme.root.p}; } ` +
                // ------------------------- Settings -------------------------
                `.logo { background-image: url(${curTheme.settings.logoUrl}); }` +
                // ---------------------- Border Colors ----------------------
                `.border-bright-color { border-color: ${curTheme.colors.brightColor} }` +
                `.border-light-color { border-color: ${curTheme.colors.lightColor} ;} ` +
                `.border-soft-color { border-color: ${curTheme.colors.softColor} ;} ` +
                `.border-medium-color { border-color: ${curTheme.colors.mediumColor} ;} ` +
                `.border-dark-color { border-color: ${curTheme.colors.darkColor} ;} ` +
                `.border-very-dark-color { border-color: ${curTheme.colors.veryDarkColor} ;} ` +
                `.border-light-shade { border-color: ${curTheme.colors.lightShade} ;} ` +
                `.border-medium-shade { border-color: ${curTheme.colors.mediumShade} ;} ` +
                `.border-dark-shade { border-color: ${curTheme.colors.darkShade} ;} ` +
                `.border-very-dark-shade { border-color: ${curTheme.colors.veryDarkShade} ;} ` +
                `.border-ok-color { border-color: ${curTheme.colors.okColor} ;} ` +
                `.border-alert-color { border-color: ${curTheme.colors.alertColor} ;} ` +
                `.border-highlight-color { border-color: ${curTheme.colors.highlightColor} ; } ` +
                // ---------------------- BACKGROUND COLORS ----------------------
                `.background-bright-color { background-color: ${curTheme.colors.brightColor};} ` +
                `.background-light-color { background-color: ${curTheme.colors.lightColor};} ` +
                `.background-soft-color { background-color: ${curTheme.colors.softColor};} ` +
                `.background-medium-color { background-color: ${curTheme.colors.mediumColor};} ` +
                `.background-dark-color { background-color: ${curTheme.colors.darkColor};} ` +
                `.background-very-dark-color { background-color: ${curTheme.colors.veryDarkColor};} ` +
                `.background-light-shade { background-color: ${curTheme.colors.lightShade};} ` +
                `.background-medium-shade { background-color: ${curTheme.colors.mediumShade};} ` +
                `.background-dark-shade { background-color: ${curTheme.colors.darkShade};} ` +
                `.background-very-dark-shade { background-color: ${curTheme.colors.veryDarkShade};} ` +
                `.background-ok-color { background-color: ${curTheme.colors.okColor};} ` +
                `.background-alert-color { background-color: ${curTheme.colors.alertColor};} ` +
                `.background-highlight-color { background-color: ${curTheme.colors.highlightColor};} ` +
                // ---------------------- TEXT COLORS ----------------------
                `.text-bright-color { color: ${curTheme.colors.brightColor};} ` +
                `.text-light-color { color: ${curTheme.colors.lightColor};} ` +
                `.text-soft-color { color: ${curTheme.colors.softColor} ;} ` +
                `.text-medium-color { color: ${curTheme.colors.mediumColor};} ` +
                `.text-dark-color { color: ${curTheme.colors.darkColor};} ` +
                `.text-very-dark-color { color: ${curTheme.colors.veryDarkColor};} ` +
                `.text-light-shade { color: ${curTheme.colors.lightShade};} ` +
                `.text-medium-shade { color: ${curTheme.colors.mediumShade};} ` +
                `.text-dark-shade { color: ${curTheme.colors.darkShade};} ` +
                `.text-very-dark-shade { color: ${curTheme.colors.veryDarkShade};} ` +
                `.text-ok-color { color: ${curTheme.colors.okColor};} ` +
                `.text-alert-color { color: ${curTheme.colors.alertColor};} ` +
                `.text-highlight-color { color: ${curTheme.colors.highlightColor};} `;
            //endregion
            // --------------------------------------

            cssDispatch({
                type: "UPDATE_CSS",
                payload: css
            })
        }

        fetchTheme(cssUUID).then(theme => {
            updateCSS(theme)
        })
    }, [cssUUID, themes])

    // Change theme on user interaction
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  // React.ChangeEvent<HTMLSelectElement>
        localDispatch({
            type: "CSS_UUID",
            payload: e.target.value,
        });
    }

    return (
        <>
            <div className="ThemeSelector">
                <select onChange={(e) => handleChange(e)}
                        value={cssUUID}
                        style={{
                            backgroundColor: themes.find((item: themeListDataInterface) => item.uuid === cssUUID)?.background,
                            color: themes.find((item: themeListDataInterface) => item.uuid === cssUUID)?.text,
                        }}
                >
                    {
                        themes.map((item) => {
                            return (
                                <option
                                    key={item.uuid}
                                    value={item.uuid}
                                >
                                    {item.name}
                                </option>)
                        })
                    }
                </select>
            </div>
            <div className="error"
                 style={{display: errorMsg.current !== "" ? 'block' : 'none'}}>{errorMsg.current}</div>
            <style>{cssStyle !== "" && cssStyle}</style>
        </>
    )
}

export default ThemeSelector;