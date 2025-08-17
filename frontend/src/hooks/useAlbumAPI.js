import { useState } from "react";

export function useAlbumAPI() {
    const [ albums, setAlbums ] = useState([]);
    const [ album, setAlbum ] = useState({});
    const [ albumPage, setAlbumPage ] = useState(0);
    const [ isAlbumLast, setIsAlbumLast ] = useState(0);
    const [ isAlbumLoading, setAlbumLoading ] = useState(false);
    const [ albumError, setAlbumError ] = useState(null);

    const getMainAlbums = async () => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch(`/api/albums?page=0&size=4`);

            if(!res.ok) throw new Error("앨범 목록 조회에 실패했습니다.");
            const result = await res.json();
            const newAlbums = result.data.content;

            setAlbums(newAlbums);
        } catch(err) {
            setAlbumError(err.message);
        } finally {
            setAlbumLoading(false);
        }
    }

    const getAlbums = async (page) => {
        setAlbumPage(page);
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch(`/api/albums?page=${page}`);

            if(!res.ok) throw new Error("앨범 목록 조회에 실패했습니다.");
            const result = await res.json();
            const newAlbums = result.data.content;
            const last = result.data.last;

            setIsAlbumLast(last);
            setAlbums(prevAlbums => {
                const baseAlbums = page <= 0 ? [] : prevAlbums;
                return [ ...baseAlbums, ...newAlbums ]; 
            });
        } catch(err) {
            setAlbumError(err.message);
        } finally {
            setAlbumLoading(false);
        }
    }

    const getAlbum = async (albumId) => {
        setAlbumLoading(true);
        setAlbumError(null);

        try {
            const res = await fetch(`/api/albums/${albumId}`);

            if(!res.ok) throw new Error("앨범 조회에 실패했습니다.");
            const result = await res.json();
            const albumData = result.data;

            setAlbum(albumData);
        } catch(err) {
            setAlbumError(err.message);
        } finally {
            setAlbumLoading(false);
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
            const request = {
                eventName: formData.eventName,
                eventDate: formData.eventDate
            };

            const form = new FormData();
            form.append("request", new Blob([JSON.stringify(request)], {type: "application/json"}))
            form.append("file", file);

            const createAlbum = await fetch ("/api/albums/upload", {
                method: "POST",
                body: form
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
            const request = {
                    eventName: formData.eventName,
                    eventDate: formData.eventDate
            };
            const form = new FormData();

            if(file) {
                form.append("request", new Blob([JSON.stringify(request)], {type: "application/json"}))
                form.append("file", file);
            }    

            const res =  file  
                ? await fetch (`/api/albums/${id}` ,{
                    method: "PUT",
                    body: form
                })
                : await fetch (`/api/albums/update/${id}` ,{
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(request)
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
            getAlbums(0);
        }
    }

    return { getMainAlbums, getAlbums, getAlbum, albumPage, createAlbum, updateAlbum, deleteAlbum, 
        albums, album, isAlbumLast, isAlbumLoading, setAlbumLoading, albumError, setAlbumError };
}