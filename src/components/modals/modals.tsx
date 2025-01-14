/* Modals
################################### Restaurant Functional Module ###################################
Module: Main
/src/components/modals.tsx    ::: modals
REQ: Vite-React.js+TypeScript, react-router-dom, react-hot-toast,
include modals.css
(c)2024 Lance Stubblefield
####################################################################################################
*/

import './modals.css';

interface confirmDialogProps {
    modalDialog: string;
    responseText: string;
    responseAction: () => void;
    dialogRef: React.RefObject<HTMLDialogElement>;
}

function Confirmation({modalDialog, responseText, responseAction, dialogRef}: confirmDialogProps) {

    return (

        <dialog ref={dialogRef} className="background-light-color border-dark-color"
                onClick={(e) =>
            (e.currentTarget === e.target) ? dialogRef.current?.close() : null}
        >
            <div className="modal">
                <div className="modalDialog">
                    <p className="text-dark-color">{modalDialog}</p>
                </div>
                <div className="modalResponse">
                    <button className="cancelButton" onClick={() => {
                        dialogRef.current?.close();
                    }}> Cancel
                    </button>
                    <button className="confirmButton" onClick={() => {responseAction();
                        dialogRef.current?.close();}
                    }>{responseText}</button>
                </div>
            </div>
        </dialog>
    )
}

export default Confirmation;