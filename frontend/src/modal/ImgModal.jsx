import { React } from "react";
import { FaXmark, FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa6";
import ModalLayout from "./ModalLayout";

export default function ImgModal({ canDelete = false, onDelete = () => {}, 
                                swipeHandler, filename, setActive, updateIdx }) {
    const handleClick = (e) => {
        e.stopPropagation();
    }
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";


    return (
        <ModalLayout swipeHandler={swipeHandler} onClick={() => {setActive(false)}}>
            <div 
                onClick={handleClick}
                className="flex flex-col max-w-5xl mx-auto justify-center items-center"
            >
                <div className="relative w-full">
                    <div className="flex absolute top-[-40px] right-12 text-2xl mb-2">
                        { canDelete &&  (
                            <button 
                                onClick={() => {onDelete(true), setActive(false)}}
                                className="p-2 rounded-lg text-white text-xl hover:text-gray-700"
                            >
                                <FaTrash />
                            </button> 
                        )}
                        <button 
                            onClick={() => {setActive(false)}}
                            className="p-2 rounded-lg text-white text-2xl hover:text-gray-700"
                        >
                            <FaXmark />
                        </button>
                    </div>
                    <div className="flex">
                        <div className="flex items-center">
                            <button onClick={() => updateIdx(-1)} className="p-2 mr-2 hover:bg-gray-500 rounded-lg text-white text-4xl hover:text-gray-700">
                                <FaAngleLeft />
                            </button>
                        </div>
                        <img src={`${url}photos/${filename}`} className="w-[80vh] rounded-lg" />
                        <div className="flex items-center">
                            <button onClick={() => updateIdx(+1)} className="p-2 ml-2 hover:bg-gray-500 rounded-lg text-white text-4xl hover:text-gray-700">
                                <FaAngleRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}