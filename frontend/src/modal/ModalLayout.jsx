import { React } from "react";

export default function ModalLayout({ children, swipeHandler = {}, onClick }) {
    return (
        <div {...swipeHandler} onClick={onClick}
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            style={{ touchAction: "pan-y" }}>
            {children}
        </div>
    )
}