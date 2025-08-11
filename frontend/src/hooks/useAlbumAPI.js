import { useState } from "react";

export function useAlbumAPI() {
    const [ albums, setAlbums ] = useState([]);
    const [ albumPage, setAlbumPage ] = useState(0);
    const [ isAlbumLoading, setAlbumLoading ] = useState(false);
    const [ albumError, setAlbumError ] = useState(null);

    const getMainAlbums = async () => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch(`/api/albums?page=${albumPage}&size=4`);

            if(!res.ok) throw new Error("앨범 목록 조회에 실패했습니다.");
            const result = await res.json();
            setAlbums(result.data.content);
        } catch(err) {
            setAlbumError(err.message);
        } finally {
            setAlbumLoading(false);
        }
    }

    const getAlbums = async () => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch(`/api/albums?page=${albumPage}&size=10&sort=eventDate,desc`);

            if(!res.ok) throw new Error("앨범 목록 조회에 실패했습니다.");
            const result = await res.json();
            setAlbums(result.data.content);
        } catch(err) {
            setAlbumError(err.message);
        } finally {
            setAlbumLoading(false);
        }
    }

    const uploadPresignedUrl = async (file) => {
        try {
            const presignedResponse = await fetch("/api/albums/presigned-url", {
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
            setAlbumError(err.message);
            return false;
        }
    }

    const createAlbum = async (finalData) => {
        setAlbumLoading(true);
        setAlbumError(null);
        const { formData, file } = finalData;
        
        if (!file) {
            setAlbumError("앨범을 생성하려면 이미지를 선택해야 합니다.");
            setAlbumLoading(false);
            return false;
        }

        try {
            const uploadRes = await uploadPresignedUrl(file);

            if(!uploadRes) throw new Error("파일 업로드 실패");

            const { objectKey, fileName, originalFileName } = uploadRes;

            const createAlbum = await fetch ("/api/albums", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    eventName: formData.eventName,
                    eventDate: formData.eventDate,
                    originalFileName: originalFileName,
                    fileName: fileName,
                    objectKey: objectKey
                })
            })
            if(!createAlbum.ok) throw new Error("앨범 생성에 실패했습니다."); 
            return true;
        } catch (err) {
            setAlbumError(err.message);
            return false;
        } finally {
            setAlbumLoading(false);
        }
    }

    const updateAlbum = async (finalData) => {
        setAlbumLoading(true);
        setAlbumError(null);
        const { formData, file } = finalData;
        const id = formData.albumId;

        try {
            let fileInfo = {};

            if(file) {
                const uploadRes = await uploadPresignedUrl(file);

                if(!uploadRes) throw new Error("파일 업로드 실패");

                fileInfo = uploadRes;
            }
                const payload = {
                    eventName: formData.eventName,
                    eventDate: formData.eventDate,
                    ...fileInfo
                }

                const res = await fetch (`/api/albums/${id}`, {
                    method: file ? "PUT" : "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(payload)
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
            const res = await fetch(`/api/albums/${albumId}`, {
                method: "DELETE"
            });

            if(!res.ok) throw new Error("앨범 삭제에 실패했습니다.");
            return true;
        } catch(err) {
            setAlbumError(err.message);
            return false;
        } finally {
            setAlbumLoading(false);
            getAlbums();
        }
    }

    return { getMainAlbums, getAlbums, setAlbumPage, createAlbum, updateAlbum, deleteAlbum, 
        albums, isAlbumLoading, setAlbumLoading, albumError, setAlbumError };
}