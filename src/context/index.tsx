/* CONTEXT
################################### Restaurant Functional Module ###################################
/src/context/stateReducers.tsx    ::: application context container
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import {createContext, Dispatch} from "react";
import {initialState, StateInterface, ActionInterface} from "src/context/reducers/stateReducers.tsx";
import {initialLocalState, LocalStateInterface, LocalActionInterface} from "src/context/reducers/localStateReducers.tsx";

export const ctx = createContext<{
    state: StateInterface;
    dispatch: Dispatch<ActionInterface>;
    localState: LocalStateInterface;
    localDispatch: Dispatch<LocalActionInterface>;
}>({
        state: initialState,
        dispatch: () => null,
        localState: initialLocalState,
        localDispatch: () => null,
    }
);