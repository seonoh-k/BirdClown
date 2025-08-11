import { React, useState, useEffect, useCallback }from "react";
import { useSwipeable } from "react-swipeable";
import { FaPlus, FaTrash } from "react-icons/fa";
import ImgModal from "../modal/ImgModal";
import KebabMenu from "../kebab/KebabMenu";
import { usePhotoForm } from "../hooks/usePhotoForm";
import { usePhotoAPI } from "../hooks/usePhotoAPI";
import PhotoForm from "../modal/PhotoFormModal";

export default function PhotoGrid({ albumId }) {
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const [ isActive, setActive ] = useState(false);
    const [ imgIdx, setImgIdx ] = useState(0);

    const { getPhotos, photos, setPhotoPage, createPhoto, deletePhoto, isPhotoLoading, photoError } = usePhotoAPI({ albumId });
    
    useEffect(() => {
        getPhotos();
    }, [])

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
            getPhotos();
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
        <div className="mb-10 relative">
            <button type="button" onClick={() => { setPhotoFormActive(true), setAlbumId(albumId) }}
                className="absolute w-8 h-8 p-2 top-[-100px] right-0 bg-[#fed455] text-gray-500 rounded-lg hover:opacity-80"
            >
                <FaPlus />
            </button>
            <div className="flex flex-wrap items-center gap-8">
                {photos && photos?.map((photo, idx) => (
                    <div key={photo.id} className="relative">
                        <KebabMenu items = {[
                            {
                                label: "삭제",
                                icon: <FaTrash className="mt-1" />,
                                onClick: () => handlePhotoDelete(photo.id)
                            }
                        ]}/>
                        <div>
                            <img src={`${url}${photo.objectKey}`} onClick={() => { setImgIdx(idx), setActive(true) }}
                                className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] object-cover rounded-lg cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        { isActive && (
            <ImgModal canDelete={true} onDelete={() => handlePhotoDelete(photos[imgIdx].id)} swipeHandler={swipeHandler} 
            filename={photos[imgIdx].objectKey} setActive={setActive} updateIdx={updateIdx} />
        )}
        { isPhotoFormActive && (
            <PhotoForm preview={photoPreview} isLoading={isPhotoLoading} error={photoError}
            handleFileChange={handlePhotoFileChange} handleSubmit={handlePhotoSubmit} handleCancle={handlePhotoCancle}/>
        )}
        </>
    )
}