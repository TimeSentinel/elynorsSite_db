/* REDUCERS
################################### Restaurant Functional Module ###################################
/src/reducer/stateReducers.tsx    ::: Reducers
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

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

// export interface ProductInterface {  // Menu Module
//     id: string;
//     type: string;
//     category: string;
//     title: string;
//     description: string;
//     price: number;
//     image: string;
// }

export const initialState: StateInterface = {
    style: {
        cssStyle: "Default",        // Themes Module
        siteTitle: "Fine Dining",   // Themes Module
        siteTagline: ""             // Themes Module
    }
}

export const reducerFn = (state: StateInterface, action: ActionInterface) => {
    const {type, payload} = action
    switch (type) {
        case "UPDATE_STYLE":
            console.log("---- payload ----")
            console.log(payload)// Menu Module
            return {
                ...state,
                style: (payload as StateInterface)
            }

        default:
            return state
    }
}

