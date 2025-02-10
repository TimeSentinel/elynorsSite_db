/* Cart Page
################################### Restaurant Functional Module ###################################
Module: Cart
/modules/Cart/pages/Cart/index.tsx    ::: Cart Page
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import {useContext, useState, FC, useEffect, useRef} from "react";
// import {CartItem} from "src/modules/Cart/containers/Cart";
import {ctx} from "src/context";
import toast from "react-hot-toast";
import "src/modules/Cart/pages/cartPages.css";
import Confirmation from "src/components/modals/modals.tsx";
import {CartItem} from "src/modules/Cart/containers/Cart";

interface productPriceInterface {
    productprice: number;
}

interface itemPriceInterface {
    itemprice: number;
}

const Cart: FC = () => {
    const localState = useContext(ctx).localState;
    const localDispatch = useContext(ctx).localDispatch
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [total, setTotal] = useState<number>(0)

    const emptyCart = () => {
        const confirm = true;
        if (confirm) {
            localDispatch({
                type: "EMPTY_CART",
                payload: {}
            })
            if (Object.keys(localState.shoppingCart).length !== 0) toast.success("CART EMPTIED!")
        }
    }


    async function fetchProdCost(productID: string): Promise<[productPriceInterface]> {
        const response = await fetch('http://localhost:3001/?query=productprice&id=' + productID);
        return await response.json();
    }

    async function fetchitemprice(itemID: string): Promise<[itemPriceInterface]> {
        const response = await fetch('http://localhost:3001/?query=itemprice&id=' + itemID);
        return await response.json();
    }

    useEffect(() => {
        const promises: Promise<number>[] = []

        Object.keys(localState.shoppingCart).forEach(product => {
            localState.shoppingCart[product].items.forEach(item =>
                promises.push(fetchitemprice(item.value).then(iData =>
                    localState.shoppingCart[product].quantity * (iData[0].itemprice || 0)
                ))
            )

            promises.push(fetchProdCost(localState.shoppingCart[product].prodid).then(pData =>
                localState.shoppingCart[product].quantity * (pData[0].productprice || 0)
            ))
        })

        Promise.all(
            promises
        ).then(prices => {
                setTotal(prices.reduce((partialSum, value) => partialSum + value, 0))
            }
        )

    }, [localState])

    return (
        <>
            <div className="cartHeader">
                <div className="cartLeft">
                    <h1>Your Cart...</h1>
                </div>
                <div className="cartCenter"></div>
                <div className="cartRight">
                    <button onClick={() =>
                        (Object.keys(localState.shoppingCart).length > 0) && dialogRef.current?.showModal()
                    } className={
                        Object.keys(localState.shoppingCart).length == 0 &&
                        "disabled" || "enabled"
                    }>
                        Empty Cart
                    </button>
                </div>
            </div>
            <hr className="cartLineTop border-medium-color"/>
            <div className="cartTable border-dark-color">
                <div className="cartTableHeader text-dark-color border-dark-color">
                    <div className="cartTableHeaderItem column0 text-alert-color">X</div>
                    <div className="cartTableHeaderItem column1 text-highlight-color">Edit</div>
                    <div className="cartTableHeaderItem column2">Item</div>
                    <div className="cartTableHeaderItem column3">Name</div>
                    <div className="cartTableHeaderItem column4">Price</div>
                    <div className="cartTableHeaderItem column5"></div>
                    <div className="cartTableHeaderItem column6">Qty</div>
                    <div className="cartTableHeaderItem column7">Total</div>
                </div>
                {Object.keys(localState.shoppingCart).length ? (
                    <>
                        {Object.keys(localState.shoppingCart).map(product => {
                            const itemList =
                                localState.shoppingCart[product].items.map(item => item.value)
                            return (
                                < CartItem cartid={product}
                                           prodid={localState.shoppingCart[product].prodid}
                                           items={itemList}
                                           key={localState.shoppingCart[product].prodid}/>
                            )
                        })}
                    </>
                ) : (
                    <h3>Cart Is Empty</h3>
                )
                }
            </div>
            <div className="cartTotal  text-very-dark-color">TOTAL = &nbsp;
                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(total) ?? 0}
            </div>
            <hr className="cartLineBottom border-medium-color"/>
            <div className="cartFooter">
                <button onClick={() => {
                    if (Object.keys(localState.shoppingCart).length !== 0) toast.success("Order Submitted!")

                }} className={
                    Object.keys(localState.shoppingCart).length == 0 && "disabled" || "enabled"
                }>Place Order
                </button>
            </div>
            <Confirmation modalDialog={"Empty cart and remove all items?"}
                          responseText={"Yes"}
                          responseAction={() => emptyCart()}
                          dialogRef={dialogRef}/>

        </>
    )
}
export default Cart;
