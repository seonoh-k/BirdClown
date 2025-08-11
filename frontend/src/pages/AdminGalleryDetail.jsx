import { React }from "react";
import { Link, useParams } from "react-router-dom";
import AlbumDetailHeader from "./AlbumDetailHeader";
import PhotoGrid from "./PhotoGrid";

export default function AdminGalleryDetail() {
    const { albumId } = useParams();
    
    return (
        <>
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center relative">
            <AlbumDetailHeader albumId={albumId} />
            <hr className="mb-10 border-gray-500"/>
            <PhotoGrid albumId={albumId} />
            <div className="text-center my-10">
                <Link to="/admin/gallery" className="px-8 py-4 rounded-xl bg-[#fed455] text-lg text-gray-600 opacity-90 hover:opacity-80">
                    목록
                </Link>
            </div>
        </div>
        </>
    )
}