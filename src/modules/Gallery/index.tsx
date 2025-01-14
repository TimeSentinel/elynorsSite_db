/* gallery/Blog Module
################################### Restaurant Functional Module ###################################
/modules/Gallery/index.tsx    ::: gallery module
REQ: Vite-React.js+TypeScript,
(c)2024 Lance Stubblefield
####################################################################################################
*/
import './gallery.css'
import {useEffect, useRef, useState} from "react";

interface galleryInterface {
    "uuid": string,
    "title": string,
    "description": string,
    "category": string,
    "imagePath": string,
    "imageAlt": string
}

function Gallery() {
    const errorMsg = useRef<string>("");
    const [photos, loadPhotos] = useState<galleryInterface[]>([{
        "uuid": "",
        "title": "",
        "description": "",
        "category": "",
        "imagePath": "",
        "imageAlt": ""
    }]);

    // !!! Load News Feed
    useEffect(() => {
        fetch("/gallery/gallery.json") //     <---!!!Path to themes list json file!!!
            .then(res => res.json())
            .then(data => {
                loadPhotos(data.images);
            })
            .catch(error => errorMsg.current = "gallery/gallery.json: " + error.message)
    }, [])

    return (
        <div className="gallery background-light-color border-medium-color">
            {photos?.map((photo: galleryInterface, i) => {
                return (
                    <div className="photoCardContainer">
                        <div className="photoCard border-medium-color background-soft-color" key={i}>
                            <div className="galleryImage">
                                <img src={photo.imagePath} alt={photo.imageAlt} className="border-medium-color" />
                            </div>
                            <div className="galleryTitle text-dark-color">{photo.title}</div>
                            <div className="galleryDescription text-dark-color">
                                <p>{photo.description}</p>
                            </div>
                        </div>
                    </div>
                )
            })
            }
            <div className="newsMessage border-alert-color text-alert-color"
                 style={{display: errorMsg.current !== "" ? 'block' : 'none'}}>{errorMsg.current}</div>
        </div>
    )
}

export default Gallery;
