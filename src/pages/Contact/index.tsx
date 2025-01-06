/* Contact Page
################################### Restaurant Functional Module ###################################
Main Pages
/src/pages/Contact/index.tsx    ::: Contact Us page
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
(c)2024 Lance Stubblefield
####################################################################################################
*/

import "src/pages/pages.css"
import {useState} from "react";
import {useForm} from "react-hook-form";
 import useWeb3forms from "@web3forms/react";

function Contact() {
    interface FormData {
        name: string;
        phone: string;
        email: string;
        message: string;
    }

    const [result, setResult] = useState("");
    const {submit} = useWeb3forms<FormData>({
        access_key: "0d584a33-c65d-4991-843b-6a67e1248023", //Lance
        settings: {
            from_name: "elynor's Submission",
            subject: "New Submission elynor's Test Website",
        },
        onSuccess: (successMessage, data) => {
            console.log(successMessage, data)
            setResult(successMessage);
            alert(successMessage);
            reset();
        },
        onError: (errorMessage, data) => {
            console.log(errorMessage, data)
            setResult(errorMessage);
        },

    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>();
    const clearForm = () => {
        reset();
        setResult("");
    }

    return (
        <>
            <div className="mainPage background-light-color text-dark-color border-medium-color">
                <div className="contactContainer">
                    <div className="bodyHead">
                        <h1>Contact Us Page</h1>
                        <p className="text-medium-color">
                            Fill in the fields below to get in touch with us. <br/>
                            <br/>
                            Currently using Web3Forms for email submission.
                            <br/>
                        </p>
                        <br/>
                    </div>
                    {/*<hr className="hrDivider  border-medium-color"/>*/}
                    <div className="bodyMain">

                        <div className="contactCard border-dark-color background-medium-color">
                            <form
                                encType="multipart/form-data"
                                onSubmit={handleSubmit(submit)}
                                id="contactForm"
                            >
                                <input type="text" {...register("name", {
                                    required: "*Name Required", maxLength: 80,
                                })}
                                       className="formInput border-dark-color text-bright-color"
                                       id="formName"
                                       placeholder="Name (required)"
                                />
                                <span className="errorMsg">{errors.name?.message || ""}</span>

                                <input type="tel" {...register("phone", {maxLength: 80,})}
                                       className="formInput border-dark-color text-bright-color"
                                       id="formPhone"
                                       placeholder="Phone"
                                />
                                <input type="email" {...register("email", {
                                    required: "*Valid Email Address Required", pattern: {
                                        value: /^\S+@\S+$/i, message: "Please enter a valid email",
                                    },
                                })}
                                       className="formInput border-dark-color text-bright-color"
                                       id="formEmail"
                                       placeholder="Email (required)"
                                />
                                <span className="errorMsg">{errors.email?.message || ""}</span>
                                <textarea {...register("message", {required: "*Message Required",})}
                                          id="formMessage"
                                          placeholder="Enter Message Here..."
                                          className="border-dark-color text-bright-color"
                                ></textarea>
                                <span className="errorMsg">{errors.message?.message || ""}</span>

                                {/*<input type="file"  {...register("file")}*/}
                                {/*       className="formInput" id="formFile" placeholder="Attach File"/>*/}

                                <div className="h-8 w-full text-white">{result}</div>
                                <div className="buttonRow">
                                    <button id="formButton" type="submit" className="btn">Send</button>
                                    <button id="clearButton" type="reset" className="btn" onClick={clearForm}>Clear
                                    </button>
                                </div>
                            </form>


                        </div>


                    </div>
                    {/*<hr className="hrDivider  border-medium-color"/>*/}
                    <div className="bodyFoot">
                        <h3>Thanks!</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact

