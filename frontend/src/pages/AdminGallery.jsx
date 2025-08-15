import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumForm from "../modal/AlbumFormModal";
import LoadingSpinner from "./LodaingSpinner";
import { useAlbumForm } from "../hooks/useAlbumForm";
import { useAlbumAPI } from "../hooks/useAlbumAPI";
import KebabMenu from "../kebab/KebabMenu";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default function AdminGallery() {
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const { getAlbums, albums, albumPage, createAlbum, updateAlbum, deleteAlbum, isAlbumLast, isAlbumLoading, setAlbumLoading, albumError, setAlbumError } = useAlbumAPI();

    const onAlbumSubmit = async (finalData) => {
        let success = false;
        if(mode === "create") {
            success = await createAlbum(finalData);
        }else {
            success = await updateAlbum(finalData);
        }

        if(success) {
            getAlbums(0);
            handleAlbumCancle();
        }
    }

    useEffect(() => {
        getAlbums(0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if(isAlbumLoading && isAlbumLast) return;

            if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) {
            const nextPage = albumPage + 1;
            getAlbums(nextPage);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {window.removeEventListener("scroll", handleScroll)}
    }, [isAlbumLast, albumPage, isAlbumLoading]);

    const { isAlbumFormActive, setAlbumFormActive, formData, setFormData, albumPreview, setAlbumPreview, mode, setMode, 
            handleAlbumChange, handleAlbumFileChange, handleAlbumSubmit, handleAlbumCancle } = useAlbumForm({ onAlbumSubmit: onAlbumSubmit });

    const handleAlbumUpdate = (album) => {
        setFormData({ 
            albumId: album.albumId, 
            eventName: album.eventName, 
            eventDate: album.eventDate
        });
        setAlbumPreview(url + "thumbnails/" + album.fileName);
        setMode("update");
        setAlbumFormActive(true);
    }

    const handleAlbumDelete = (albumId) => {
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        
        if(isConfirmed) {
            deleteAlbum(albumId);
        }else {
            return;
        }
    }

    return (
        <>
        <div className="flex flex-col max-w-[400px] md:max-w-6xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center relative">
            <h1 className="text-4xl md:text-5xl mb-8">Gallery</h1>
            <button type="button" onClick={() => { setAlbumFormActive(true), setMode("create"), setAlbumLoading(false), setAlbumError(null) }}
                className="absolute w-8 h-8 p-2 top-8 right-0 bg-bclightblue text-gray-200 rounded-lg 
                transition-transform duration-300 hover:scale-105 hover:z-10"
            >
                <FaPlus />
            </button>
            <hr className="w-full mb-14 border md:border-2 border-gray-600"/>
            <div className="w-full">
                {albums && albums.length <= 0 && !isAlbumLoading && (
                    <p className="text-3xl text-bcred">등록된 앨범이 없습니다</p>
                )}
                <div className="flex items-center justify-center text-center">
                    {albums && isAlbumLoading && !isAlbumLast && (
                        <LoadingSpinner className="text-bcblue" />
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                    {albums?.map((album) => (
                        <div key={album.albumId} className="relative">
                            <KebabMenu items = {[
                                {
                                    label: "수정",
                                    icon: <FaPenToSquare className="mt-1" />,
                                    onClick: () => handleAlbumUpdate(album)
                                },
                                {
                                    label: "삭제",
                                    icon: <FaTrash className="mt-1" />,
                                    onClick: () => handleAlbumDelete(album.albumId)
                                }
                            ]}/>
                            <Link to={`/admin/gallery/detail/${album.albumId}`}>
                                <img src={`${url}thumbnails/${album.fileName}`} 
                                    className="w-[185px] md:w-[352px] h-[185px] md:h-[352px] object-cover rounded-lg shadow-lg
                                    transition-transform duration-300 hover:scale-105 hover:z-10" />
                                <div className="flex mt-1 justify-center md:justify-between">
                                    <span className="hidden md:block text-sm md:text-xl">{album.eventDate}</span>
                                    <span className="text-md md:text-xl">{album.eventName}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <div className="flex items-center justify-center text-center">
                        {!albums && isAlbumLoading && !isAlbumLast && (
                            <LoadingSpinner className="text-bcblue" />
                        )}
                        {albumError && (
                            <div className="text- xl text-bcred">
                                {albumError}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {isAlbumFormActive && (
            <AlbumForm mode={mode} initialData={formData} preview={albumPreview}
            handleChange={handleAlbumChange} handleFileChange={handleAlbumFileChange}
            handleSubmit={handleAlbumSubmit} handleCancle={handleAlbumCancle} 
            isLoading={isAlbumLoading} error={albumError}/>
        )}
        </>
    )
}