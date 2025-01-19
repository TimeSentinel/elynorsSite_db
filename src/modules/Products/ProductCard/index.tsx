/* ---------------------------------------
src/modules/Products/ProductCard/index.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

import './productCard.css'
import {FC} from "react";
import useSWR from "swr";

interface OptionInterface {
    optid: string;
    optname: string;
    optdesc: string;
    opttype: string;
}

interface ItemInterface {
    itemid: string;
    itemname: string;
    itemvalue: string;
    itemcost: number;
}

const ProductCard: FC = (productID) => {
    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) =>
            fetch(url, init).then((res) => res.json());
    const {
        data: productDetails,
        error,
        isLoading,
        isValidating,
    } = useSWR({url: "http://localhost:3001/?query=card&id=" + productID, init: {method: "GET"}}, fetcher);
    if (isLoading || isValidating) return <div className="loading">Loading product details...</div>;
    if (error) return <div className="failed">Failed to load the product info</div>;

    return (
        <div className="productCard" key={productDetails.prodid}>
            <div className="productCardTitle">{productDetails.prodname}</div>
            <div className="productCardImage"><img src={productDetails.prodImage} alt={productDetails.prodshort}/></div>
            <div className="productCardDesc">{productDetails.proddesc}</div>
            <div className="productCardPrice">{productDetails.prodprice}</div>
            <div className="productCardCats">{productDetails.catname + "/" + productDetails.subcatname}</div>
            {productDetails.options.map((option: OptionInterface) => {
                    return (
                        <div className="optionFrame" key={option.optid}>
                            <div className="optionTitle">{option.optname}</div>
                            <div className="optionDesc">{option.optdesc}</div>
                            <div className="itemFrame">
                                {productDetails.options.items.map((item: ItemInterface) => {
                                    return (
                                        <div className="itemElement">
                                            <div className="itemRow">
                                                <div className="itemName">
                                                    <input type={option.opttype} value={item.itemid}
                                                           checked={item.itemvalue === "selected"}/>
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
    )
}
export default ProductCard;