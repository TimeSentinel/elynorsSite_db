/* Home Page
################################### Restaurant Functional Module ###################################
Main Pages
/src/pages/Home/stateReducers.tsx    ::: Home Page
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import "src/pages/pages.css"
import diningRoom from "/public/images/diningroom1.jpg"

function Home() {


    return (
        <div className="mainPage background-light-color text-dark-color">
            <div>
                <div className="bodyHead">
                    <h1 className=" text-very-dark-color">Elynor's Fine Dining</h1>
                    <h2 className=" text-dark-color">You will feel like the most important guest in the room.</h2>
                </div>
                <hr className="hrDivider border-medium-color"/>
                <div className="bodyMain">
                    <h2 className=" text-dark-color">Classy new establishment. </h2>

                    <p>Fine food and superior service are our number one priorities. </p>
                    <br/>
                    <div className="imageCard border-dark-color background-medium-color text-soft-color">
                        <img src={diningRoom} alt="dining room" className="border-dark-color" />

                        <p>Our beautiful dining room in Vancouver, WA.</p>
                    </div>
                </div>
                <hr className="hrDivider border-medium-color"/>
                <div className="bodyFoot">
                    <h3 className="text-dark-color">Don't be a stranger!</h3>
                    <p className="quote text-medium-color">
                        Our goal is to make every customer feel like royalty. <br/>
                        Come in and relax - we will take care of everything.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home

