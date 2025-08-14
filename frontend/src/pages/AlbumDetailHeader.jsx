import { React, useEffect }from "react";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import KebabMenu from "../kebab/KebabMenu";
import { useAlbumForm } from "../hooks/useAlbumForm";
import { useAlbumAPI } from "../hooks/useAlbumAPI";
import AlbumForm from "../modal/AlbumFormModal";

export default function AlbumDetailHeader({ albumId }) {
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const { getAlbum, album, updateAlbum, deleteAlbum, isAlbumLoading, albumError } = useAlbumAPI();

    useEffect(() => {
        getAlbum(albumId);
    }, []);

    const onAlbumSubmit = async (finalData) => {
        let success = false;
        if(mode === "update") {
            success = await updateAlbum(finalData);
        }

        if(success) {
            handleAlbumCancle();
            getAlbum(albumId);
        }
    }

    const { isAlbumFormActive, setAlbumFormActive, formData, setFormData, albumPreview, setAlbumPreview, mode, setMode, 
            handleAlbumChange, handleAlbumFileChange, handleAlbumSubmit, handleAlbumCancle } = useAlbumForm({ onAlbumSubmit : onAlbumSubmit });

    const handleAlbumUpdate = (album) => {
        setFormData({ albumId: album.albumId, eventName: album.eventName, eventDate: album.eventDate });
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
        <h1 className="text-3xl md:text-5xl mb-2">{album.eventName}</h1>
        <p className="text-xl md:text-2xl mb-2">{album.eventDate}</p>
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
        {isAlbumFormActive && (
            <AlbumForm mode={mode} initialData={formData} preview={albumPreview}
            handleChange={handleAlbumChange} handleFileChange={handleAlbumFileChange}
            handleSubmit={handleAlbumSubmit} handleCancle={handleAlbumCancle} 
            isLoading={isAlbumLoading} error={albumError}/>
        )}
        </>
    )
}