import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import AlbumForm from "../modal/AlbumFormModal";
import { useAlbumForm } from "../hooks/useAlbumForm";
import { useAlbumAPI } from "../hooks/useAlbumAPI";
import KebabMenu from "../kebab/KebabMenu";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default function AdminGallery() {
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const { getAlbums, albums, setPage, createAlbum, updateAlbum, deleteAlbum, isAlbumLoading, setAlbumLoading, albumError, setAlbumError } = useAlbumAPI();

    const onAlbumSubmit = async (finalData) => {
        let success = false;
        if(mode === "create") {
            success = await createAlbum(finalData);
        }else {
            success = await updateAlbum(finalData);
        }

        if(success) {
            getAlbums();
            handleAlbumCancle();
        }
    }

    useEffect(() => {
        getAlbums();
    }, []);

    const { isAlbumFormActive, setAlbumFormActive, formData, setFormData, albumPreview, setAlbumPreview, mode, setMode, 
            handleAlbumChange, handleAlbumFileChange, handleAlbumSubmit, handleAlbumCancle } = useAlbumForm({ onAlbumSubmit: onAlbumSubmit });

    const handleAlbumUpdate = (album) => {
        setFormData({ 
            albumId: album.albumId, 
            eventName: album.eventName, 
            eventDate: album.eventDate
        });
        setAlbumPreview(url + album.objectKey);
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
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center relative">
            <h1 className="text-5xl mb-20">Gallery</h1>
            <button type="button" onClick={() => { setAlbumFormActive(true), setMode("create"), setAlbumLoading(false), setAlbumError(null) }}
                className="absolute w-8 h-8 p-2 top-16 right-1 bg-[#fed455] text-gray-500 rounded-lg hover:opacity-80"
            >
                <FaPlus />
            </button>
            <div>
                <div className="flex flex-wrap items-center gap-8">
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
                                <img src={`${url}${album.objectKey}`} className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] object-cover rounded-lg" />
                                <div className="flex justify-between">
                                    <span className="text-lg">{album.eventDate}</span>
                                    <span className="text-lg">{album.eventName}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
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