/* News/Blog Module
################################### Restaurant Functional Module ###################################
/modules/News/index.tsx    ::: News module
REQ: Vite-React.js+TypeScript,
(c)2024 Lance Stubblefield
####################################################################################################
*/
import './news.css'
import {useEffect, useRef, useState} from "react";

interface newsFeedInterface {
    "uuid": string,
    "title": string,
    "short": string,
    "paragraph": string,
    "summary": string,
    "photoPath": string,
    "photoAlt": string,
    "dateAdded": string
}

function News() {
    const errorMsg = useRef<string>("");
    const [newsFeed, loadNewsFeed] = useState<newsFeedInterface[]>([{
        uuid: "",
        title: "",
        short: "",
        paragraph: "",
        summary: "",
        photoPath: "",
        photoAlt: "",
        dateAdded: ""
    }]);

    // !!! Load News Feed
    useEffect(() => {
        fetch("/news/news.json") //     <---!!!Path to themes list json file!!!
            .then(res => res.json())
            .then(data => {
                loadNewsFeed(data.articles);
            })
            .catch(error => errorMsg.current = "news/news.json: " + error.message)
    }, [])


    return (
        <div className="newsContainer background-light-color border-soft-color">
            <div className="newsHeader text-medium-color">
                <h1 className=" text-dark-color">News</h1>
            </div>
            <div className="newsReel">
                {newsFeed?.map((newsFeed: newsFeedInterface, i) => {
                    return (
                        <div className="newsCard border-medium-color" key={i}>
                            <div className="newsDate text-medium-color">{newsFeed.dateAdded}</div>
                            <div className="newsTop">
                                <div className="newsLeft">
                                    <img className="border-dark-color" src={newsFeed.photoPath} alt={newsFeed.photoAlt}/>
                                </div>
                                <div className="newsRight">
                                    <div className="newsTitle"><h2 className="text-dark-color">{newsFeed.title}</h2>
                                    </div>
                                    <div className="newsSub text-medium-color">{newsFeed.short}</div>
                                </div>
                            </div>
                            <div className="newsDescription text-medium-color">
                                <p>{newsFeed.paragraph}</p>
                            </div>
                            <div className="newsFooter text-dark-color">{newsFeed.summary}</div>
                        </div>
                    )
                })
                }
                <div className="newsMessage border-alert-color text-alert-color"
                     style={{display: errorMsg.current !== "" ? 'block' : 'none'}}>{errorMsg.current}</div>
            </div>
        </div>
    )
}

export default News;
