import { React } from "react";
import { FaXmark, FaAngleLeft, FaAngleRight, FaTrash } from "react-icons/fa6";
import ModalLayout from "./ModalLayout";

export default function ImgModal({ canDelete = false, onDelete = () => {}, 
                                swipeHandler, eventName = "", filename, setActive, updateIdx }) {
    const handleClick = (e) => {
        e.stopPropagation();
    }
    const url = "/api/r2/presigned-url?objectKey=";


    return (
        <ModalLayout swipeHandler={swipeHandler} onClick={() => {setActive(false)}}>
            <div 
                onClick={handleClick}
                className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto justify-center items-center"
            >
                <div className="flex w-full md:w-[1000px] 2xl:w-[1200px] relative">
                    <div className="flex absolute top-[-25px] left-1/2 -translate-x-1/2 -translate-y-1/2 mb-2">
                        { canDelete &&  (
                            <button 
                                onClick={() => {onDelete(true), setActive(false)}}
                                className="mr-2 rounded-lg text-white text-xl hover:text-gray-700"
                            >
                                <FaTrash />
                            </button> 
                        )}
                        <button 
                            onClick={() => {setActive(false)}}
                            className="rounded-lg text-white text-2xl hover:text-gray-700"
                        >
                            <FaXmark />
                        </button>
                    </div>
                    <div className="flex w-full justify-center relative">
                        <img src={`${url}photos/${filename}`} alt={`${eventName}에서 공연하는 버드클라운`} 
                            className="object-contain mas-w-full max-h-[90vh] rounded-lg" />
                        <button onClick={() => updateIdx(-1)} className="absolute top-1/2 left-0 -translate-y-1/2 p-2 mr-2 hover:bg-gray-500 rounded-lg text-white text-2xl md:text-4xl hover:text-gray-700">
                            <FaAngleLeft />
                        </button>
                        <button onClick={() => updateIdx(+1)} className="absolute top-1/2 right-0 -translate-y-1/2 p-2 ml-2 hover:bg-gray-500 rounded-lg text-white text-2xl md:text-4xl hover:text-gray-700">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}