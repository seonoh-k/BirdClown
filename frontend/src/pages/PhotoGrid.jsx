import { React, useState, useEffect, useCallback }from "react";
import { useSwipeable } from "react-swipeable";
import { FaPlus, FaTrash } from "react-icons/fa";
import ImgModal from "../modal/ImgModal";
import LoadingSpinner from "./LodaingSpinner";
import KebabMenu from "../kebab/KebabMenu";
import { usePhotoForm } from "../hooks/usePhotoForm";
import { usePhotoAPI } from "../hooks/usePhotoAPI";
import PhotoForm from "../modal/PhotoFormModal";

export default function PhotoGrid({ albumId }) {
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const [ isActive, setActive ] = useState(false);
    const [ imgIdx, setImgIdx ] = useState(0);

    const { getPhotos, photos, photoPage, createPhoto, deletePhoto, isPhotoLast, isPhotoLoading, photoError } = usePhotoAPI({ albumId });
    
    useEffect(() => {
        getPhotos(0);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if(isPhotoLoading && isPhotoLast) return;

            if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) {
            const nextPage = photoPage + 1;
            getPhotos(nextPage);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {window.removeEventListener("scroll", handleScroll)}
    }, [isPhotoLast, photoPage, isPhotoLoading])

    const updateIdx = useCallback((newDir) => {        
        setImgIdx((prevIdx) => (
            (prevIdx + newDir + photos.length) % photos.length
        ));
    }, [photos.length]);

    const swipeHandler = useSwipeable({
        onSwipedLeft: () => updateIdx(1),
        onSwipedRight: () => updateIdx(-1),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === "Escape") {
                setActive(false);
            }else if(e.key === "ArrowLeft") {
                updateIdx(-1);
            }else if(e.key === "ArrowRight") {
                updateIdx(1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [updateIdx]);

    const onPhotoSubmit = async (fileData) => {
        const success = await createPhoto(fileData);

        if(success) {
            getPhotos(0);
            handlePhotoCancle();
        }
    }

    const { isPhotoFormActive, photoPreview, setPhotoFormActive, setAlbumId,
            handlePhotoFileChange, handlePhotoSubmit, handlePhotoCancle } = usePhotoForm({ onPhotoSubmit : onPhotoSubmit });

    const handlePhotoDelete = (photoId) => {
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

        if(isConfirmed) {
            deletePhoto(photoId);
        }else {
            return;
        }
    }

    return (
        <>
        <div className="my-4 relative">
            <button type="button" onClick={() => { setPhotoFormActive(true), setAlbumId(albumId) }}
                className="absolute w-8 h-8 p-2 top-[-116px] right-0 bg-bclightblue text-gray-200 rounded-lg
                transition-transform duration-300 hover:scale-105 hover:z-10"
            >
                <FaPlus />
            </button>
            {photos && photos.length <= 0 && !isPhotoLoading && (
                <p className="text-3xl text-bcred text-center">등록된 사진이 없습니다.</p>
            )}
            <div className="flex items-center justify-center text-center">
                {photos && isPhotoLoading && !isPhotoLast && (
                    <LoadingSpinner className="text-bcblue" />
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
                {photos && photos?.map((photo, idx) => (
                    <div key={photo.photoId} className="relative">
                        <KebabMenu items = {[
                            {
                                label: "삭제",
                                icon: <FaTrash className="mt-1" />,
                                onClick: () => handlePhotoDelete(photo.photoId)
                            }
                        ]}/>
                        <div>
                            <img src={`${url}thumbnails/${photo.fileName}`} onClick={() => { setImgIdx(idx), setActive(true) }}
                                className="w-[185px] md:w-full h-[185px] md:h-[330px] object-cover rounded-lg shadow-lg cursor-pointer
                                transition-transform duration-300 hover:scale-105 hover:z-10" />
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center text-center">
                    {!photos && isPhotoLoading && !isPhotoLast && (
                        <LoadingSpinner className="text-bcblue" />
                    )}
                    {photoError && (
                        <div className="text-xl text-bcred">
                            {photoError}
                        </div>
                    )}
                </div>
            </div>
        </div>
        { isActive && (
            <ImgModal canDelete={true} onDelete={() => handlePhotoDelete(photos[imgIdx].photoId)} swipeHandler={swipeHandler} 
            filename={photos[imgIdx].fileName} setActive={setActive} updateIdx={updateIdx} />
        )}
        { isPhotoFormActive && (
            <PhotoForm preview={photoPreview} isLoading={isPhotoLoading} error={photoError}
            handleFileChange={handlePhotoFileChange} handleSubmit={handlePhotoSubmit} handleCancle={handlePhotoCancle}/>
        )}
        </>
    )
}