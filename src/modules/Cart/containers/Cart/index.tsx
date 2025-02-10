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
import {ctx} from "src/context";
import toast from "react-hot-toast";

interface CartProps {
    cartid: string;
    prodid: string;
    items: string[];
}

const CartItem = ({cartid, prodic, items}: CartProps) => {
    const localDispatch = useContext(ctx).localDispatch
    const shoppingCart = useContext(ctx).localState.shoppingCart

    let rowTitle: string = "NOT VALID";
    let rowPrice: number = 0;


    const addClick = (row: string) => {
        if (!(row in shoppingCart)) {
            localDispatch({
                type: "ADD_TO_CART",
                payload: {targetid: row, quantity: 1}
            })
        } else {
            const curCount = shoppingCart[row].quantity || 0
            localDispatch({
                type: "UPDATE_CART",
                payload: {targetid: row, quantity: (curCount + 1)}
            })
        }
    }

    const minusClick = (row: string) => {
        if (!(row in shoppingCart)) {
            toast.error("Failed to Reduce Quantity!")
        } else if (shoppingCart[row].quantity === 1) {
            localDispatch({
                type: "REMOVE_ITEM",
                payload: {targetid: row, quantity: 0}
            })
        } else {
            const curCount = shoppingCart[row].quantity || 0
            localDispatch({
                type: "UPDATE_CART",
                payload: {targetid: row, quantity: (curCount - 1)}
            })
        }
    }
    console.log(cartid)
    return (
        <div className="cartRow border-medium-color" key={cartid}>
            <div className="mainRow">
                <div className="cartDelete">
                    <button onClick={() => localDispatch({type: "REMOVE_ITEM", payload: {cartid}})}>X
                    </button>
                </div>
                <div className="cartEdit">
                    <button className="text-highlight-color border-highlight-color background-light-shade"
                            onClick={() => console.log("EDIT")}>EDIT
                    </button>
                </div>
                <div className="cartTitle text-very-dark-color">
                    {rowTitle ?? ""}
                </div>
                <div className="cartCategory text-dark-color">{shoppingCart[cartid].name}</div>
                <div className="cartPrice  text-very-dark-color">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(rowPrice) ?? 0}
                </div>
                <div className="column4"></div>
                <div className="cartQtyCol  text-very-dark-color">
                    <button className="cartInc background-light-color text-dark-color border-dark-color"
                            onClick={() => addClick(cartid)}>+
                    </button>
                    <div className="cartQty">{shoppingCart[cartid].quantity | 0}</div>
                    <button className="cartDec background-light-color text-dark-color border-dark-color"
                            onClick={() => minusClick(cartid)}>-
                    </button>
                </div>


                <div className="cartLineTotal  text-very-dark-color">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(((rowPrice) * (shoppingCart[cartid].quantity))) ?? 0}
                </div>
            </div>
            {shoppingCart[cartid].items.map((item) => (
                <div className="itemRow">
                    <div className="itemFiller"></div>
                    <div className="itemData text-bright-color">
                        <div className="itemName" key={item.value}>
                            {item.value}
                        </div>
                        <div className="itemPrice">
                            {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(1) ?? 0}
                        </div>
                    </div>
                    <div className="itemFiller"></div>
                </div>
            ))}
        </div>

)
}

export {CartItem}