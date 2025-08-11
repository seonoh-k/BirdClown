import { useState, useEffect } from "react";

export function usePhotoForm({ onPhotoSubmit }) {
    const [ isPhotoFormActive, setPhotoFormActive ] = useState(false);
    const file = null;
    const [ selectedPhotoFile, setPhotoFile ] = useState(file);
    const [ albumId, setAlbumId ] = useState(null);
    const [ photoPreview, setPhotoPreview ] = useState(null);

    useEffect(() => {
        if(!selectedPhotoFile) {
            setPhotoPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedPhotoFile);
        setPhotoPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedPhotoFile]);

    const handlePhotoFileChange = (e) => {
        setPhotoFile(e.target.files[0]);
    }

    const handlePhotoSubmit = (e) => {
        e.preventDefault();
        const fileData = new FormData();

        if(selectedPhotoFile) {
            fileData.append("albumId", albumId);
            fileData.append("file", selectedPhotoFile);
        }

        onPhotoSubmit(fileData);
    }

    const handlePhotoCancle = () => {
        setPhotoFile(file);
        setPhotoPreview(null);
        setPhotoFormActive(false);
    }

    return {
        isPhotoFormActive, setPhotoFormActive,
        photoPreview, setAlbumId,
        handlePhotoFileChange,
        handlePhotoSubmit,
        handlePhotoCancle
    }
}