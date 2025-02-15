/* About Page
################################### Restaurant Functional Module ###################################
Main Pages
/src/pages/About/index.tsx    ::: About Us page
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import "src/pages/pages.css"

function About() {


    return (
        <>
            <div className="mainPage background-light-color text-dark-color border-medium-color">
                <div className="bodyHead ">
                    <h1>About This Site</h1>
                    <p>
                        This site is a demonstration of technology and design.<br/><br/>
                        All of the modules/components of this site are custom designed.
                    </p>
                    <br/>
                    <p className="text-medium-color">
                        This site has been setup primarily as a database based content system. The navigation menus use
                     a JSON file that can be easily customized.
                    </p>
                </div>
                <hr className="hrDivider border-medium-color"/>
                <div className="bodyMain ">
                    <h2>Modules</h2>
                    <p className="text-medium-color">
                        These are packages that can be easily customized and incorporated into your site.
                        Below are lists of my current modules and some of their options.
                    </p>
                    <table className="text-medium-color border-medium-color">
                        <tbody>
                        <tr className="theadrow border-medium-color text-very-dark-color background-soft-color">
                            <th>Module</th>
                            <th>Description</th>
                            <th>Implements</th>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Pages</td>
                            <td className="description">
                                Basic set of webpages including 'Home', 'Contact', 'About', and 'News'
                            </td>
                            <td className="details">
                                This sets up the site using React-Router for navigation and React-Context for
                                information.<br/>
                                The content for any of these can be managed with a simple admin panel or made to remain
                                 static.<br/>
                                Contact form can be configured to update a backend database or send an email. A file
                                attachment system can be implemented as well.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Themes</td>
                            <td className="description">
                                Using a selection box in the footer, the entire site's theme can be
                                changed at any time from any page on the site.<br/>

                            </td>
                            <td className="details">
                                Using admin accessible JSON files or database tables, the admin can change the theme
                                color, fonts, logo, and some layout effects by simply editing a text file.<br/>
                                Themes can be stored in a database, or in JSON file format if database is not available.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Products</td>
                            <td className="description">
                                This is a requirement for most restaurant websites. This is the display
                                of the products you offer. The 'Menu' is included in this package.
                            </td>
                            <td className="details">
                                Using database tables or JSON files, you can edit the images, descriptions, offerings, and pricing by
                                editing a text file.<br/>
                                You can add custom options to each item and full shopping cart functionality.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Cart</td>
                            <td className="description">
                                Not required for all sites, but if you want people to purchase online, a
                                shopping cart is important. This takes input from the 'Products' module.
                            </td>
                            <td className="details">
                                Using React-Context and local storage (provided by a user's browser), a shopping
                                cart can be retained even if a user's browser or computer is restarted.<br/>
                                Payment functionality, delivery/pick-up options, and customization can be easily added.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Blog/News</td>
                            <td className="description">
                                Just a list of sharable pieces of information. A great place for items you can
                                share on social media. A great way to build brand trust.<br/>
                                Share recipes, tips, parties you had or events that are coming.
                            </td>
                            <td className="details">
                                Using database tables or JSON files to make it easy to update,
                                 add, and remove articles and images. <br/>
                                This is essential for good SEO campaigns.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Social</td>
                            <td className="description">
                                The social media module adds functionality for sharing.
                                Icons in the header to share the site, share icons on the product cards and with the
                                newsfeed articles.
                            </td>
                            <td className="details">
                                Stores required information and links in a json file for easy editing. This could be
                                 made static or changable in an admin console.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Gallery</td>
                            <td className="description">
                                A great way to share photos of food, your establishments, successful events
                                employees, and more.
                            </td>
                            <td className="details">
                                Uses JSON file or database tables. Can be editable in admin console. <br/>
                                This could be a slide show, grid-layout, or any manner of presentation you would like.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title"></td>
                            <td className="description"></td>
                            <td className="details"></td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                </div>
                <hr className="hrDivider border-medium-color"/>
                <div className="bodyFoot">
                    <h2>Technologies Used</h2>
                    <p className="text-medium-color">These are all behind the scenes. Some of these come down to a
                        programmer's preference and some
                        are selected based on the required functionality and appearance of a site.</p>
                    <table className="text-medium-color border-medium-color">
                        <tbody>
                        <tr className="theadrow border-medium-color text-very-dark-color background-soft-color">
                            <th>Technology</th>
                            <th>Description</th>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">HTML and CSS</td>
                            <td className="description">
                                This is the code your browser uses provide the layout and visual style for the site.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">React and React Packages</td>
                            <td className="description">
                                This is the main tool used for developing this site. <br/>
                                It is a Javascript library that
                                makes it easy to make a site modular.
                                This allows a much faster site by providing the ability to make code reusable.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Typescript</td>
                            <td className="description">
                                Typescript is an alternate version Javascript. It requires Javascript code to be more
                                specific about each element's usage. <br/>
                                This means fewer errors and faster processing. It promotes component style programming,
                                making it easier to compartmentalize code sections for easy reuse.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">TailwindCSS</td>
                            <td className="description">
                                A library that adds shorthand and simplifies CSS coding.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">PostCSS and PostCSS-Custom-Properties</td>
                            <td className="description">
                                Another CSS library that adds some functionality like variables and logic
                                to style sheets.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Vite</td>
                            <td className="description">
                                A project manager that automates setting up a project, creating folder structure,
                                and installing required packages.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Node.JS, NPM</td>
                            <td className="description">
                                Backend package manager that provides functionality for development. NPM (Node Package
                                Manager) is responsible for live development and build compiling (turning the code I
                                can read into the final code your browser requires).
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">Express.js</td>
                            <td className="description">
                                Javascript library for backend server setup. This is what listens for and handles
                                 requests from your browser for information from the database.
                            </td>
                        </tr>
                        <tr className="border-light-color">
                            <td className="title">PostgreSQL Database</td>
                            <td className="description">
                                Database used on this site. Just about any database will work. <br/>
                                Postgres is opensource, free software.
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default About;

