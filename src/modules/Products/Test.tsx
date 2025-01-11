/* ---------------------------------------
src/modules/Products/Test.tsx
PROJECT: elynors;

(c) 2025 Lance Stubblefield 
--------------------------------------- */
import useSWR from "swr";
import "./products.css"

fetch("/themes/themes.json", {
    method: "POST",
    body: JSON.stringify({username: "example"}),
}) //     <---!!!Path to themes list json file!!!
    .then(res => res.json())


function Test() {
    const fetcher =
        ({url, init}: { url: RequestInfo | URL, init?: RequestInit }) => fetch(url, init).then((res) => res.json());
    const request = "/products";

    const {
        data,
        error,
        isValidating,
    } = useSWR(["http://localhost:3001" + request, {method: "GET"}], fetcher);

    if (error) return <div className="failed">failed to load</div>;
    if (isValidating) return <div className="loading">Loading...</div>;

    return (
        <div className="test">
            This is a database test!

            <div>
                {data &&
                    data.map(() => {
                        return (
                            <div className="dataRow">
                                <div className="dataCell">
                                    {data.productName}
                                </div>
                                <div className="dataCell">
                                    {data.productDesc}
                                </div>
                                <div className="dataCell">
                                    {data.productPrice}
                                </div>
                                <div className="dataCell">
                                    {data.productImage}
                                </div>
                                <div className="dataCell">
                                    {data.productTags}
                                </div>
                                <div className="dataCell">
                                    {data.catName}
                                </div>
                                <div className="dataCell">
                                    {data.subcatName}
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