/* ---------------------------------------
src/modules/Themes/LoadCSS.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */


import useSWR from "swr";
import {useContext, useEffect, useRef} from "react";
import {ctx} from "src/context";
import {API_HOST} from "../../assets/env.ts";

interface CSSProps {
    themeID: string;
}

const LoadCSS = ({themeID}: CSSProps) => {
    let cssStyle: string = ""
    const errorMsg = useRef<string>("");
    const query = API_HOST + `/theme/${themeID}`;
    const dispatch = useContext(ctx).dispatch

    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) =>
            fetch(url, init).then((res) => res.json());

    const {
        data,
        error: themeError,
        isLoading: themeLoading,
        isValidating: themeValidate
    } = useSWR({url: query, init: {method: "GET"}}, fetcher, {revalidateOnFocus: false})

    useEffect(() => {
        if (data !== undefined) {
            const curTheme = data[0]

        dispatch({
            type: "UPDATE_STYLE",
            payload: {
                    cssStyle: curTheme.themename || "Default",
                    siteTitle: curTheme.sitetitle || "Fine Dining",
                    siteTagline: curTheme.sitetagline || "Eat Here"

            }
        })
        }

    },[data, dispatch]);

    if (themeLoading || themeValidate) return <div className="loading">Loading theme elements \ | /</div>;
    if (themeError) errorMsg.current = "Failed to load the theme elements";


    if (data !== undefined) {
        const curTheme = data[0]


        cssStyle =
            `body { ${curTheme.body};
                 font-family: ${curTheme.font};
                 font-size: ${curTheme.fontSize};
                 } ` +
            `h1 { ${curTheme.h1}; } ` +
            `h2 { ${curTheme.h2}; } ` +
            `h3 { ${curTheme.h3}; } ` +
            `h4 { ${curTheme.h4}; } ` +
            `h5 { ${curTheme.h5}; } ` +
            `button { ${curTheme.button}; } ` +
            `p { ${curTheme.p}; } ` +
            // ------------------------- Settings -------------------------
            `.logo { background-image: url(${curTheme.logourl}); }` +
            `.hero { background-image: url(${curTheme.heroimage}); }` +
            // ---------------------- Border Colors ----------------------
            `.border-faint-color { border-color: ${curTheme.faintcolor} }` +
            `.border-bright-color { border-color: ${curTheme.brightcolor} }` +
            `.border-light-color { border-color: ${curTheme.lightcolor} ;} ` +
            `.border-soft-color { border-color: ${curTheme.softcolor} ;} ` +
            `.border-medium-color { border-color: ${curTheme.mediumcolor} ;} ` +
            `.border-dark-color { border-color: ${curTheme.darkcolor} ;} ` +
            `.border-very-dark-color { border-color: ${curTheme.verydarkcolor} ;} ` +
            `.border-light-shade { border-color: ${curTheme.lightshade} ;} ` +
            `.border-medium-shade { border-color: ${curTheme.mediumshade} ;} ` +
            `.border-dark-shade { border-color: ${curTheme.darkshade} ;} ` +
            `.border-very-dark-shade { border-color: ${curTheme.verydarkshade} ;} ` +
            `.border-ok-color { border-color: ${curTheme.okcolor} ;} ` +
            `.border-alert-color { border-color: ${curTheme.alertcolor} ;} ` +
            `.border-highlight-color { border-color: ${curTheme.highlightcolor} ; } ` +
            // ---------------------- BACKGROUND COLORS ----------------------
            `.background-bright-color { background-color: ${curTheme.brightcolor};} ` +
            `.background-light-color { background-color: ${curTheme.lightcolor};} ` +
            `.background-soft-color { background-color: ${curTheme.softcolor};} ` +
            `.background-medium-color { background-color: ${curTheme.mediumcolor};} ` +
            `.background-dark-color { background-color: ${curTheme.darkcolor};} ` +
            `.background-very-dark-color { background-color: ${curTheme.verydarkcolor};} ` +
            `.background-light-shade { background-color: ${curTheme.lightshade};} ` +
            `.background-medium-shade { background-color: ${curTheme.mediumshade};} ` +
            `.background-dark-shade { background-color: ${curTheme.darkShade};} ` +
            `.background-very-dark-shade { background-color: ${curTheme.verydarkshade};} ` +
            `.background-ok-color { background-color: ${curTheme.okcolor};} ` +
            `.background-alert-color { background-color: ${curTheme.alertcolor};} ` +
            `.background-highlight-color { background-color: ${curTheme.highlightcolor};} ` +
            // ---------------------- TEXT COLORS ----------------------
            `.text-bright-color { color: ${curTheme.brightcolor};} ` +
            `.text-light-color { color: ${curTheme.lightcolor};} ` +
            `.text-soft-color { color: ${curTheme.softcolor} ;} ` +
            `.text-medium-color { color: ${curTheme.mediumcolor};} ` +
            `.text-dark-color { color: ${curTheme.darkcolor};} ` +
            `.text-very-dark-color { color: ${curTheme.verydarkcolor};} ` +
            `.text-light-shade { color: ${curTheme.lightshade};} ` +
            `.text-medium-shade { color: ${curTheme.mediumshade};} ` +
            `.text-dark-shade { color: ${curTheme.darkshade};} ` +
            `.text-very-dark-shade { color: ${curTheme.verydarkshade};} ` +
            `.text-ok-color { color: ${curTheme.okcolor};} ` +
            `.text-alert-color { color: ${curTheme.alertcolor};} ` +
            `.text-highlight-color { color: ${curTheme.highlightcolor};} `

    }

    return (
        <>
            <div className="error"
                 style={{display: errorMsg.current !== "" ? 'block' : 'none'}}>{errorMsg.current}</div>
            <style>{cssStyle !== undefined && cssStyle}</style>
        </>
    )
}
export default LoadCSS;