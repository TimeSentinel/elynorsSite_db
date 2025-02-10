/* REDUCERS
################################### Restaurant Functional Module ###################################
/src/reducer/stateReducers.tsx    ::: Reducers
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

// --------------- DEBUG ---------------
const debug = false;


export interface StateInterface { // Menu Module
    style: {
        cssStyle: string;
        siteTitle: string;
        siteTagline: string;
    }
}

export interface ActionInterface {
    type: string;
    payload: unknown;
}

export const initialState: StateInterface = {
    style: {
        cssStyle: "Default",        // Themes Module
        siteTitle: "Fine Dining",   // Themes Module
        siteTagline: "You will feel like the most important guest in the room."             // Themes Module
    }
}

export const reducerFn = (state: StateInterface, action: ActionInterface) => {
    const {type, payload} = action
    switch (type) {
        case "UPDATE_STYLE":
            if (debug) console.log("---- payload ----")
            if (debug) console.log(payload)// Menu Module
            return {
                ...state,
                style: (payload as StateInterface)
            }

        default:
            return state
    }
}

