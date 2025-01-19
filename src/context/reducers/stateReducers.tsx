/* REDUCERS
################################### Restaurant Functional Module ###################################
/src/reducer/stateReducers.tsx    ::: Reducers
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

export interface StateInterface { // Menu Module
    products: ProductInterface[];
    cssStyle: string;
}

export interface ActionInterface {
    type: string;
    payload: unknown;
}

export interface ProductInterface {  // Menu Module
    id: string;
    type: string;
    category: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export const initialState: StateInterface = {
    products: [],           // Menu Module
    cssStyle: "Default",    // Themes Module
}

export const reducerFn = (state: StateInterface, action: ActionInterface) => {
    const {type, payload} = action
    switch (type) {
        case "ADD_PRODUCTS":    // Menu Module
            return {
                ...state,
                products: (payload as ProductInterface[])
            }

        default:
            return state
    }
}

