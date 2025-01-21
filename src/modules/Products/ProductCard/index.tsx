/* ---------------------------------------
src/modules/Products/ProductCard/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './productCard.css'
import {ChangeEvent, FC, useEffect, useState} from "react";
import useSWR from "swr";
import {useParams} from "react-router";

interface OptionInterface {
    optid: string;
    optname: string;
    optdesc: string;
    opttype: string;
    items: ItemInterface[];
}

interface ItemInterface {
    itemid: string;
    itemname: string;
    itemvalue: string;
    itemcost: number;
}

interface SelectedInterface {
    group: string;
    value: string;
}

const ProductCard: FC = () => {
    const {productID} = useParams()
    const [selectedValue, setSelectedValue] = useState<SelectedInterface[]>([])

    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) =>
            fetch(url, init).then((res) => res.json());
    const {
        data: productDetails,
        error,
        isLoading,
        isValidating,
    } = useSWR({
        url: "http://localhost:3001/?query=card&id=" + productID,
        init: {method: "GET"}
    }, fetcher, {revalidateOnFocus: false});

    useEffect(() => {
        let tempSelects: SelectedInterface[] = []
        if (productDetails != undefined) {
            productDetails.options.map((option: OptionInterface) => {
                option.items.filter((item) => item.itemvalue === "selected").map((item2) => {
                        tempSelects = [...tempSelects, {
                            group: option.optid,
                            value: item2.itemid
                        }]
                    }
                )
            })
            setSelectedValue(tempSelects)
        }
    }, [productDetails])


    if (isLoading || isValidating) return <div className="loading">Loading product details...</div>;
    if (error) return <div className="failed">Failed to load the product info</div>;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let tempSelection: SelectedInterface[] = selectedValue

        if (e.target.type === "radio") {
            tempSelection = tempSelection.filter((selected) => selected.group !== e.target.name);
        }

        if (tempSelection.filter((selection) => e.target.id === selection.value).length > 0) {
            tempSelection = tempSelection.filter((selected) => selected.value !== e.target.value);
        } else {
            tempSelection = [...tempSelection, {
                group: e.target.name,
                value: e.target.value
            }]
        }

        setSelectedValue(tempSelection)
    }

    const submitCart = () => {
        console.log(selectedValue)
        // if (!(row in activeCart)) {
        //     localDispatch({
        //         type: "ADD_TO_CART",
        //         payload: {id: row, quantity: 1}
        //     })
        //     toast.success("Added to Cart");
        // } else {
        //     const curCount = activeCart[row] || 0
        //     localDispatch({
        //         type: "UPDATE_CART",
        //         payload: {id: row, quantity: (curCount + 1)}
        //     })
        //     toast.success("Cart Updated");
        // }
    }

    return (
        <div className="productCard">
            <div className="productCardTitle text-dark-color">{productDetails.productname}</div>
            <div className="productCardImage">
                <img className="border-dark-color" src={productDetails.productimage}
                     alt={productDetails.prodshort}/>
            </div>
            <div className="productCardDesc text-dark-color"><p>{productDetails.productdesc}</p></div>
            <div className="productCardPrice text-very-dark-color">{productDetails.productprice}</div>
            <div
                className="productCardCats text-medium-color">{productDetails.catname + "/" + productDetails.subcatname}</div>
            <div className="productCardTags text-bright-color">{productDetails.producttags}</div>
            <div className="productCardOptions">
                {productDetails.options.map((option: OptionInterface) => {
                        return (
                            <div className="optionFrame border-very-dark-color background-medium-color text-light-color"
                                 key={option.optid}>
                                <div className="optionTitle">{option.optname}</div>
                                <div className="optionDesc text-soft-color">{option.optdesc}</div>
                                <div className="itemFrame border-soft-color">
                                    {option.items.map((item: ItemInterface) => {
                                        return (
                                            <div className="itemElement" key={item.itemid}>
                                                <div className="itemRow border-soft-color text-light-color">
                                                    <div className="itemName">
                                                        <input type={option.opttype}
                                                               name={option.optid}
                                                               id={item.itemid}
                                                               value={item.itemid}
                                                               checked={
                                                                   selectedValue.filter((selection) => item.itemid == selection.value).length > 0}
                                                               onChange={handleChange}/>
                                                        {item.itemname}
                                                    </div>
                                                    <div className="itemCost">${item.itemcost}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }
                )
                }
            </div>
            <div className="cartButton">
                <button className="text-dark-color background-alert-color" value="Submit"
                        onClick={submitCart}>
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}
export default ProductCard;