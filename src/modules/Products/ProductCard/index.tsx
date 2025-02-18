/* ---------------------------------------
src/modules/Products/ProductCard/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './productCard.css'
import {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import useSWR from "swr";
import {useNavigate, useParams} from "react-router";
import toast from "react-hot-toast";
import {ctx} from "src/context";
import uuid from 'react-uuid';

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
    itemprice: number;
}

interface SelectedInterface {
    group: string;
    value: string;
}

const ProductCard: FC = () => {
    const localDispatch = useContext(ctx).localDispatch
    // const localState = useContext(ctx).localState.shoppingCart
    const {productID} = useParams()
    const [selectedValue, setSelectedValue] = useState<SelectedInterface[]>([])
    const [targetName, setTargetName] = useState("")
    const [targetNote, setTargetNote] = useState("")
    const navigate = useNavigate();

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

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTargetName(e.target.value);
    }
    const noteChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTargetNote(e.target.value);
    }

    const submitCart = () => {
        console.log(productID)
        console.log(selectedValue)
        localDispatch({
            type: "ADD_TO_CART",
            payload: {targetid: uuid(), prodid: productID, quantity: 1, items: selectedValue, name: targetName, note: targetNote}
        })
        toast.success(productDetails.productname + " added to Cart");
            navigate('/menu');
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
                                                    <div className="itemprice">${item.itemprice}</div>
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
            <div className="nameField">
                <span className="fieldTitle text-dark-color">Who's this item for? </span>
                <input className="border-dark-color text-medium-color" type="text" name="targetName" value={targetName}
                       placeholder="Name for this item"  onChange={nameChange}/>
                <span className="tagline text-medium-color">(optional)</span>
            </div>
            <div className="noteField">
                <span className="fieldTitle text-dark-color">Notes/Instructions </span> <span
                className="tagline text-medium-color">(optional)</span>
                <input className="border-dark-color text-medium-color" type="text" name="targetName" value={targetNote}
                       placeholder="Instructions or requests"  onChange={noteChange}/>
            </div>
            <div className="cartButton">
                <button className="text-dark-color background-soft-color border-medium-color" value="Submit"
                        onClick={submitCart}>
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}
export default ProductCard;