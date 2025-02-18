/* CART Container
################################### Restaurant Functional Module ###################################
Module: Cart
/modules/Cart/containers/Cart/stateReducers.tsx    ::: cart container
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import "./Cart.css"
import {useContext, useEffect, useState} from "react";
import {ctx} from "src/context";
import toast from "react-hot-toast";

interface CartProps {
    cartid: string;
    prodid: string;
    items: string[];
}

interface CartProductInterface {
    productname: string;
    productprice: number;
}

interface CartItemInterface {
    itemid: string;
    itemname: string;
    itemprice: number;
}


const CartItem = ({cartid, prodid, items}: CartProps) => {
    const localDispatch = useContext(ctx).localDispatch
    const shoppingCart = useContext(ctx).localState.shoppingCart
    const [rowTitle, setRowTitle] = useState("NOT VALID");
    const [rowPrice, setRowPrice] = useState(0);
    const [rowItems, setRowItems] = useState<CartItemInterface[]>([]);
    const [lineTotal, setLineTotal] = useState(0);

    async function fetchCartProduct(productID: string): Promise<[CartProductInterface]> {
        const response = await fetch('http://localhost:3001/?query=cartProduct&id=' + productID);
        return await response.json();
    }

    // async function fetchCartItem(itemID: string): Promise<[CartItemInterface]> {
    async function fetchCartItem(itemID: string) {
        const response = await fetch('http://localhost:3001/?query=cartItem&id=' + itemID);
        return await response.json();
    }

    useEffect(() => {
        let itemsList: CartItemInterface[] = []
        let lineSum = 0;
        // const promises: Promise<[CartItemInterface]>[] = []

        fetchCartProduct(prodid).then(prodData => {
                setRowTitle(prodData[0].productname)
                setRowPrice(prodData[0].productprice)
            }
        )

        Promise.all(items.map(item => fetchCartItem(item))).then(products => {
            products.map(items => {
                itemsList = [...itemsList, items[0]]
                lineSum += parseFloat(items[0].itemprice) || 0
            });
            setRowItems(itemsList)
            setLineTotal(lineSum + parseFloat(rowPrice.toString()))
        })

    }, [items, prodid])


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

    return (
        <div className="cartRow border-medium-color" key={cartid}>
            <div className="mainRow">
                <div className="cartDelete">
                    <button onClick={() => localDispatch({type: "REMOVE_ITEM", payload: {cartid}})}>X
                    </button>
                </div>
                <div className="cartEdit">
                    <button className="text-light-color border-medium-color background-medium-shade"
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
                    }).format(((lineTotal) * (shoppingCart[cartid].quantity))) ?? 0}
                </div>
            </div>
            <div className="itemContainer">
                {(rowItems !== null) && rowItems.map((item) => {
                    return (
                        <div className="itemRow" key={item.itemid}>
                            <div className="itemData background-light-shade border-light-color">
                                <div className="itemName text-medium-color border-soft-color">
                                    {item.itemname}
                                </div>
                                <div className="itemPrice text-medium-color ">
                                    {(item.itemprice != 0) ? new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(item.itemprice) ?? 0 : ''}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export {CartItem}