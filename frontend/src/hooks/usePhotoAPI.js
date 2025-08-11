import { useState } from "react";

export function usePhotoAPI({ albumId }) {
    const [ photos, setPhotos ] = useState([]);
    const [ photoPage, setPhotoPage ] = useState(0);
    const [ isPhotoLoading, setPhotoLoading ] = useState(false);
    const [ photoError, setPhotoError ] = useState(null);

    const getPhotos = async () => {
        setPhotoLoading(true);
        setPhotoError(null);

        try {
            const res = await fetch(`/api/albums/${albumId}/photos?page=${photoPage}`);

            if(!res.ok) throw new Error("앨범 목록 조회에 실패했습니다.");
            const result = await res.json();
            setPhotos(result.data.content);
        } catch(err) {
            setPhotoError(err.message);
        } finally {
            setPhotoLoading(false);
        }
    }

    const uploadPresignedUrl = async (file) => {
        try {
            const presignedResponse = await fetch("/api/photos/presigned-url", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    originalFileName: file.name,
                    contentType: file.type,
                    contentLength: file.size
                })
            })

            if(!presignedResponse.ok) {
                throw new Error("Presigned URL 요청 실패");
            }

            const presignedData = await presignedResponse.json();
            const { presignedUrl, objectKey, fileName, originalFileName } = presignedData.data;

            const res = await fetch(presignedUrl, {
                method: "PUT",
                headers: {
                    "Content-type": file.type
                },
                body: file
            });

            if(!res.ok) throw new Error("썸네일 업로드 실패");
            return { objectKey, fileName, originalFileName };
        } catch(err) {
            setPhotoError(err.message);
            return false;
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
            let fileInfo = {};
            const uploadRes = await uploadPresignedUrl(file);

            if(!uploadRes) throw new Error("파일 업로드 실패");

            fileInfo = uploadRes;

            const payload = {
                albumId: albumId,
                ...fileInfo
            }

            const res = await fetch (`/api/photos`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(payload)
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
            getPhotos();
        }
    }

    return { getPhotos, photos, setPhotoPage, createPhoto, deletePhoto, isPhotoLoading, photoError };
}