import { React } from "react";
import ModalLayout from "./ModalLayout";
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
                className="flex flex-col relative px-16 py-10 justify-center items-center max-w-[80vh] max-h-[80vh] bg-gray-400 rounded-xl shadow-lg"
            >
                <button 
                    onClick={handleCancle}
                    className="absolute top-2 right-2 p-2 rounded-lg text-white text-2xl hover:text-gray-700"
                >
                    <FaXmark />
                </button>
                <h1 className="text-4xl mb-16">사진 추가</h1>
                <form id="photo-form" onSubmit={handleSubmit} className="flex items-center justify-between gap-10">
                    <div className="">
                        <label className="flex w-48 h-48 border-2 border-dashed rounded-lg justify-center items-center cursor-pointer bg-gray-200">
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
                        <p className="text-[#61ba81]">업로드 중...</p>
                    )}
                    {error && (
                        <p className="text-[#fb4140]">{error}</p>
                    )}
                </div>
                <div className="flex text-xl mt-12 gap-6">
                    <button type="submit" disabled={isLoading} form="photo-form"
                        className="px-6 py-4 bg-[#5592d3] hover:opacity-80 rounded-xl shadow-lg">
                        업로드
                    </button>
                    <button type="button" onClick={handleCancle} disabled={isLoading}
                        className="px-6 py-4 bg-[#fb4140] hover:opacity-80 rounded-xl shadow-lg">
                        취소
                    </button>
                </div>
            </div>
        </ModalLayout>
    )
}