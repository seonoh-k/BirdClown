import { React } from "react";
import ModalLayout from "./ModalLayout";
import LoadingSpinner from "../pages/LodaingSpinner";
import { FaXmark } from "react-icons/fa6";

export default function PhotoForm({ preview, isLoading, error,
                                    handleFileChange, handleSubmit, handleCancle
    }) {
    const handleClick = (e) => {
        e.stopPropagation();
    }

    return (
        <ModalLayout onClick={handleCancle}>
            <div
                onClick={handleClick}
                className="relative p-2 max-w-[80vh] max-h-[80vh] bg-bcdeepblue rounded-2xl shadow-lg"
            >
                <div className="flex flex-col px-14 py-8 justify-center items-center border border-gray-400 rounded-xl">
                    <button 
                        onClick={handleCancle}
                        className="absolute top-2 right-2 p-2 rounded-lg text-gray-200 text-2xl hover:text-gray-700"
                    >
                        <FaXmark />
                    </button>
                    <h1 className="text-4xl text-gray-200 mb-16">사진 추가</h1>
                    <form id="photo-form" onSubmit={handleSubmit} className="flex items-center justify-between gap-10">
                        <div className="">
                            <label className="flex w-48 h-48 border-2 border-dashed rounded-lg justify-center items-center cursor-pointer bg-gray-400">
                                {preview ? (
                                    <img src={preview} alt="미리보기" className="w-full h-full rounded-lg object-cover" />
                                ) : (
                                    <span>업로드할 이미지 선택</span>
                                )}
                                <input type="file" onChange={handleFileChange} accept="image/*" className="hidden"/>
                            </label>
                        </div>
                    </form>
                    <div className="mt-4 text-xl text-center">
                        {isLoading && (
                            <LoadingSpinner className="text-bcblue" />
                        )}
                        {error && (
                            <p className="text-bcred">{error}</p>
                        )}
                    </div>
                    <div className="flex text-xl mt-12 gap-6">
                        <button type="submit" disabled={isLoading} form="photo-form"
                            className="px-6 py-4 bg-bclightblue hover:opacity-80 rounded-xl shadow-lg">
                            업로드
                        </button>
                        <button type="button" onClick={handleCancle} disabled={isLoading}
                            className="px-6 py-4 bg-bcred hover:opacity-80 rounded-xl shadow-lg">
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    )
}