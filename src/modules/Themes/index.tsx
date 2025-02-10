/* Themes Main Component
################################### Restaurant Functional Module ###################################
Themes
/modules/Themes/index.tsx    ::: CSS Themes; requires theme packages
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import React, {useContext, useRef} from "react";
import {ctx} from "src/context";
import './themes.css';
import useSWR from "swr";
import LoadCSS from "src/modules/Themes/LoadCSS.tsx";

//region vv---------- INTERFACES ----------vv
interface themeListDataInterface {
    themeid: string,
    themename: string,
    themelabelbgcolor: string,
    themelabeltxtcolor: string,
}

function ThemeSelector(): React.JSX.Element {
    //region vv---------- INITIALIZATION ----------vv
    const cssUUID = useContext(ctx).localState.cssUUID;
    const localDispatch = useContext(ctx).localDispatch

    const errorMsg = useRef<string>("");

    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) =>
            fetch(url, init).then((res) => res.json());
    const {
        data: themeList,
        error: listError,
        isLoading: listLoading,
        isValidating: listValidate
    } = useSWR({url: "http://localhost:3002/themes", init: {method: "GET"}}, fetcher, {revalidateOnFocus: false});
    if (listError) errorMsg.current = "Failed to load the theme list"
    if (listValidate || listLoading) return (<div className="loading">Loading theme list...</div>)

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
                            backgroundColor: themeList.find((item: themeListDataInterface) => item.themeid === cssUUID)?.themelabelbgcolor,
                            color: themeList.find((item: themeListDataInterface) => item.themeid === cssUUID)?.themelabeltxtcolor,
                        }}
                >
                    {
                        themeList.map((item: themeListDataInterface) => {
                            return (
                                <option
                                    key={item.themeid}
                                    value={item.themeid}
                                >
                                    {item.themename}
                                </option>)
                        })
                    }
                </select>
            </div>
            <LoadCSS themeID={cssUUID} />
        </>
    )

}

export default ThemeSelector;