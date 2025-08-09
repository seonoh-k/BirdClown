import { useState } from "react";

export function usePhotoAPI() {
    const [ isPhotoLoading, setPhotoLoading ] = useState(false);
    const [ photoError, setPhotoError ] = useState(null);

    const createPhoto = async (albumId, fileData) => {
        setPhotoLoading(true);
        setPhotoError(null);

        try {
            const res = await fetch (`/api/photo/create`, {
                method: "POST",
                body: fileData
            })
            if(!res.ok) throw new Error("앨범 생성에 실패했습니다."); 
            return true;
        } catch (err) {
            setPhotoError(err.message);
            return false;
        } finally {
            setPhotoLoading(false);
        }
    }

    const deletePhoto = async (photoId) => {
        setPhotoLoading(true);
        setPhotoError(null);

        try {
            const res = await fetch(`/api/photo/delete/${photoId}`, {
                method: "POST"
            });

            if(!res.ok) throw new Error("앨범 삭제에 실패했습니다.");
            return true;
        } catch(err) {
            setPhotoError(err.message);
            return false;
        } finally {
            setPhotoLoading(false);
        }
    }

    return { createPhoto, deletePhoto, isPhotoLoading, photoError };
}