import { useState } from "react";

export function usePhotoAPI({ albumId }) {
    const [ photos, setPhotos ] = useState([]);
    const [ photoPage, setPhotoPage ] = useState(0);
    const [ isPhotoLast, setIsPhotoLast ] = useState(false);
    const [ isPhotoLoading, setPhotoLoading ] = useState(false);
    const [ photoError, setPhotoError ] = useState(null);

    const getPhotos = async (page) => {
        setPhotoPage(page);
        setPhotoLoading(true);
        setPhotoError(null);

        try {
            const res = await fetch(`/api/albums/${albumId}/photos?page=${page}`);

            if(!res.ok) throw new Error("앨범 목록 조회에 실패했습니다.");

            const result = await res.json();
            const newPhotos = result.data.content;
            const last = result.data.last;

            setIsPhotoLast(last);
            setPhotos(prevPhotos => {
                const basePhotos = page <= 0 ? [] : prevPhotos;
                return [ ...basePhotos, ...newPhotos ];
            })
        } catch(err) {
            setPhotoError(err.message);
        } finally {
            setPhotoLoading(false);
        }
    }

    const createPhoto = async (fileData) => {
        setPhotoLoading(true);
        setPhotoError(null);
        const { albumId, file } = fileData;

        if (!file) {
            setPhotoError("앨범을 생성하려면 이미지를 선택해야 합니다.");
            setPhotoLoading(false);
            return false;
        }

        try {
            const request = {
                albumId: albumId
            };

            const form = new FormData();
            form.append("request", new Blob([JSON.stringify(request)], {type: "application/json"}))
            form.append("file", file);

            const createAlbum = await fetch ("/api/photos", {
                method: "POST",
                body: form
            })

            if(!createAlbum.ok) throw new Error("사진 추가에 실패했습니다."); 
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
            const res = await fetch(`/api/photos/${photoId}`, {
                method: "DELETE"
            });

            if(!res.ok) throw new Error("앨범 삭제에 실패했습니다.");
            return true;
        } catch(err) {
            setPhotoError(err.message);
            return false;
        } finally {
            setPhotoLoading(false);
            getPhotos(0);
        }
    }

    return { getPhotos, photos, photoPage, setPhotoPage, createPhoto, deletePhoto, isPhotoLast, isPhotoLoading, photoError };
}