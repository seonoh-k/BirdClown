import { useState, useEffect } from "react";

export function useAlbumForm({ onSubmit }) {
    const [ isAlbumFormActive, setAlbumFormActive ] = useState(false);
    const initialData = { albumId: "", title: "", date: "" };
    const [ formData, setFormData ] = useState(initialData);
    const file = null;
    const [ selectedAlbumFile, setAlbumFile ] = useState(file);
    const [ albumPreview, setAlbumPreview ] = useState(null);
    const [ mode, setMode ] = useState("");

    const handleAlbumChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        if(!selectedAlbumFile) {
            setAlbumPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedAlbumFile);
        setAlbumPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedAlbumFile]);

    const handleAlbumFileChange = (e) => {
        setAlbumFile(e.target.files[0]);
    }

    const handleAlbumSubmit = (e) => {
        e.preventDefault();
        const finalData = new FormData();
        finalData.append("eventName", formData.title);
        finalData.append("eventDate", formData.date);

        if(selectedAlbumFile) {
            finalData.append("file", selectedAlbumFile);
        }

        onSubmit(finalData);
    }

    const handleAlbumCancle = () => {
        setFormData(initialData);
        setAlbumFile(file);
        setAlbumPreview(null);
        setAlbumFormActive(false);
    }

    return {
        isAlbumFormActive, setAlbumFormActive,
        formData, setFormData,
        selectedAlbumFile, setAlbumFile,
        albumPreview, setAlbumPreview,
        mode, setMode,
        handleAlbumChange,
        handleAlbumFileChange,
        handleAlbumSubmit,
        handleAlbumCancle
    }
}