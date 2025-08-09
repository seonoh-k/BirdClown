import { useState } from "react";

export function useAlbumAPI() {
    const [ isAlbumLoading, setAlbumLoading ] = useState(false);
    const [ albumError, setAlbumError ] = useState(null);

    const createAlbum = async (finalData) => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch ("/api/gallery/insert", {
                method: "POST",
                body: finalData
            })
            if(!res.ok) throw new Error("앨범 생성에 실패했습니다."); 
            return true;
        } catch (err) {
            setAlbumError(err.message);
            return false;
        } finally {
            setAlbumLoading(false);
        }
    }

    const updateAlbum = async (albumId, finalData) => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch (`/api/gallery/${albumId}`, {
                method: "POST",
                body: finalData
            })
            if(!res.ok) throw new Error("앨범 수정에 실패했습니다."); 
            return true;
        } catch (err) {
            setAlbumError(err.message);
            return false;
        } finally {
            setAlbumLoading(false);
        }
    }

    const deleteAlbum = async (albumId) => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch(`/api/gallery/delete/${albumId}`, {
                method: "POST"
            });

            if(!res.ok) throw new Error("앨범 삭제에 실패했습니다.");
            return true;
        } catch(err) {
            setAlbumError(err.message);
            return false;
        } finally {
            setAlbumLoading(false);
        }
    }

    return { createAlbum, updateAlbum, deleteAlbum, isAlbumLoading, albumError };
}