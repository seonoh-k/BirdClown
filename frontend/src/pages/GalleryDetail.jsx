import { React, useState, useEffect } from "react";
import ImgModal from "../modal/ImgModal";
import LoadingSpinner from "./LodaingSpinner";
import { useSwipeable } from "react-swipeable";
import { Link, useParams } from "react-router-dom";
import { usePhotoAPI } from "../hooks/usePhotoAPI";
import { useAlbumAPI } from "../hooks/useAlbumAPI";

export default function GalleryDetail() {
    const { albumId } = useParams();
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const [ isActive, setActive ] = useState(false);
    const [ imgIdx, setImgIdx ] = useState(0);

    const { getAlbum, album } = useAlbumAPI();
    const { getPhotos, photos, photoPage, isPhotoLast, isPhotoLoading, photoError } = usePhotoAPI({ albumId });
        
    useEffect(() => {
        getAlbum(albumId);
        getPhotos(0);
    }, [albumId])

    useEffect(() => {
        const handleScroll = () => {
            if(isPhotoLoading) return; 
            
            if(isPhotoLast) return;

            if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) {
            const nextPage = photoPage + 1;
            getPhotos(nextPage);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {window.removeEventListener("scroll", handleScroll)}
    }, [isPhotoLast, photoPage, isPhotoLoading])

    const updateIdx = (newDir) => {        
        setImgIdx((prevIdx) => (
            (prevIdx + newDir + photos.length) % photos.length
        ));
    };

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
    }, []);

    return (
        <>
        <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20">
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl mb-2">{album.eventName}</h1>
            <p className="text-xl md:text-2xl 2xl:text-3xl mb-2">{album.eventDate}</p>
            <hr className="w-full mb-6 border md:border-2 border-gray-600"/>
            <div className="w-full mb-10">
                {photos && photos.length <= 0 &&  !isPhotoLoading && (
                    <p className="text-xl md:text-2xl 2xl:text-3xl text-bcred text-center">등록된 사진이 없습니다.</p>
                )}
                <div className="flex items-center justify-center text-center">
                    {photos && isPhotoLoading && !isPhotoLast && (
                        <LoadingSpinner className="text-bcblue" />
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, idx) => (
                        <div key={photo.photoId}>
                            <img src={`${url}thumbnails/${photo.fileName}`} onClick={() => { setImgIdx(idx), setActive(true) }}
                                className="w-full h-[170px] md:h-[245px] 2xl:h-[352px] object-cover rounded-lg shadow-lg cursor-pointer
                                transition-transform duration-300 hover:scale-105 hover:z-10" />
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
            <div className="flex justify-center text-center my-10">
                <div className="p-1 py-[10px] md:py-4 rounded-xl bg-bclightblue text-lg md:text-xl 2xl:text-2xl text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                    <Link to="/gallery" className="px-3 py-2 md:px-6 md:py-3 border border-white rounded-lg">
                        목록
                    </Link>
                </div>
            </div>
        </div>
        { isActive && (
            <ImgModal swipeHandler={swipeHandler} filename={photos[imgIdx].fileName} 
            setActive={setActive} updateIdx={updateIdx} />
        )}
        </>
    )
}