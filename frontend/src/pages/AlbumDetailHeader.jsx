import { React }from "react";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import KebabMenu from "../kebab/KebabMenu";
import { useAlbumForm } from "../hooks/useAlbumForm";
import { useAlbumAPI } from "../hooks/useAlbumAPI";
import AlbumForm from "../modal/AlbumFormModal";

export default function AlbumDetailHeader({ albumId }) {
    const album = { albumId: albumId, title: "장소 행사명", date: "2025-08-09", filename: "/images/services/1.jpg" };

    const { createAlbum, updateAlbum, deleteAlbum, isAlbumLoading, albumError } = useAlbumAPI();
    
    const onAlbumSubmit = async (finalData) => {
        let success = false;
        if(mode === "create") {
            success = await createAlbum(finalData);
        }else {
            success = await updateAlbum(finalData);
        }

        if(success) {
            alert("성공적으로 저장되었습니다.");
            handleAlbumCancle();
        }
    }

    const { isAlbumFormActive, setAlbumFormActive, formData, setFormData, albumPreview, setAlbumPreview, mode, setMode, 
            handleAlbumChange, handleAlbumFileChange, handleAlbumSubmit, handleAlbumCancle } = useAlbumForm(onAlbumSubmit);

    const handleAlbumUpdate = (album) => {
        setFormData({ albumId: album.albumId, title: album.title, date: album.date });
        setAlbumPreview(album.filename);
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
        <h1 className="text-5xl mb-6">장소 행사명</h1>
        <p className="text-2xl mb-6">20xx-xx</p>
        <KebabMenu items = {[
            {
                label: "수정",
                icon: <FaPenToSquare className="mt-1" />,
                onClick: () => handleAlbumUpdate(album)
            },
            {
                label: "삭제",
                icon: <FaTrash className="mt-1" />,
                onClick: () => handleAlbumDelete(albumId)
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