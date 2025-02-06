/* CART Container
################################### Restaurant Functional Module ###################################
Module: Cart
/modules/Cart/containers/Cart/stateReducers.tsx    ::: cart container
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import "./Cart.css"
import {useContext} from "react";
import {ProductInterface} from 'src/context/reducers/stateReducers.tsx';
import {ctx} from "src/context";
import toast from "react-hot-toast";

interface CartProps {
    id: string;
}

const CartItem = ({id}: CartProps) => {
    // const state = useContext(ctx).state
    const localDispatch = useContext(ctx).localDispatch
    const shoppingCart = useContext(ctx).localState.shoppingCart

    // const activeProducts = state?.products || []
    let rowTitle: string;
    let rowCategory: string;
    let rowPrice: number;

    // const checkRoleExistence = (roleParam: string) => activeProducts.some(({id}) => id == roleParam)

    if (!(checkRoleExistence(id))) {
        // localDispatch({
        //     type: "REMOVE_ITEM",
        //     payload: {id: id, quantity: 0}
        // })
        rowTitle = "Item no longer available";
        rowCategory = "N/A";
        rowPrice = 0;
    } else {
        const product: ProductInterface = activeProducts.find(
            product => product.id === (id)
        ) as ProductInterface || {id: "0", title: "Item no longer available", category: "N/A", price: 0}
        rowTitle = product?.title || "Item no longer available";
        rowCategory = product?.category || "N/A";
        rowPrice = product?.price || 0;
    }


    const addClick = (row: string) => {
        if (!(row in shoppingCart)) {
            localDispatch({
                type: "ADD_TO_CART",
                payload: {id: row, quantity: 1}
            })
        } else {
            const curCount = shoppingCart[row] || 0
            localDispatch({
                type: "UPDATE_CART",
                payload: {id: row, quantity: (curCount + 1)}
            })
        }
    }

    const minusClick = (row: string) => {
        if (!(row in shoppingCart)) {
            toast.error("Failed to Reduce Quantity!")
        } else if (shoppingCart[row] === 1) {
            localDispatch({
                type: "REMOVE_ITEM",
                payload: {id: row, quantity: 0}
            })
        } else {
            const curCount = shoppingCart[row] || 0
            localDispatch({
                type: "UPDATE_CART",
                payload: {id: row, quantity: (curCount - 1)}
            })
        }
    }

    return (
        <div className="cartRow border-medium-color" key={id}>
            <div className="cartDelete">
                <button onClick={() => localDispatch({type: "REMOVE_ITEM", payload: {id}})}>X
                </button>
            </div>
            <div className="cartTitle text-very-dark-color">
                {rowTitle ?? ""}
            </div>
            <div className="cartCategory text-dark-color">{rowCategory ?? ""}</div>
            <div className="cartPrice  text-very-dark-color">
                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(rowPrice) ?? 0}
            </div>
            <div className="column4"></div>
            <div className="cartQtyCol  text-very-dark-color">
                <button className="cartInc background-light-color text-dark-color border-dark-color"
                        onClick={() => addClick(id)}>+</button>
                <div className="cartQty">{shoppingCart[id] | 0}</div>
                <button className="cartDec background-light-color text-dark-color border-dark-color" onClick={() => minusClick(id)}>-</button>
            </div>
            <div className="cartLineTotal  text-very-dark-color">
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(((rowPrice) * (shoppingCart[id]))) ?? 0}
            </div>
        </div>
    )
}

export {CartItem}