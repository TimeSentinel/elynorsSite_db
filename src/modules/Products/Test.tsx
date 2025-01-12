/* ---------------------------------------
src/modules/Products/Test.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */
import useSWR from "swr";
import "./products.css"

interface ProductInteface {
    productid: string;
    productname: string;
    productshort: string;
    productdesc: string;
    productprice: number;
    productimage: string;
    producttags: string;
    catname: string;
    subcatname: string;
}

function Test() {
    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) =>
            fetch(url, init).then((res) => res.json());
    const request = "/products";

    const {
        data,
        error,
        isValidating,
    } = useSWR({url: "http://localhost:3001" + request,init: {method: "GET"}}, fetcher);
    if (error) return <div className="failed">Failed to load the menu</div>;
    if (isValidating) return <div className="loading">Loading menu items...</div>;

    console.log(data);
    return (
        <div className="test">
            This is a database test!

            <div>
                {data &&
                    data.map((product:ProductInteface) => {
                        return (
                            <div className="dataRow">
                                <div className="dataCellSm">
                                    {product.productname}
                                </div>
                                <div className="dataCellMd">
                                    {product.productdesc}
                                </div>
                                <div className="dataCellSm">
                                    {product.productprice}
                                </div>
                                <div className="dataCellSm">
                                    {product.productimage}
                                </div>
                                <div className="dataCellSm">
                                    {product.producttags}
                                </div>
                                <div className="dataCellSm">
                                    {product.catname}
                                </div>
                                <div className="dataCellSm">
                                    {product.subcatname}
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Test;