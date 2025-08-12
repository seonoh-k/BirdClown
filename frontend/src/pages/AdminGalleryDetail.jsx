import { React }from "react";
import { Link, useParams } from "react-router-dom";
import AlbumDetailHeader from "./AlbumDetailHeader";
import PhotoGrid from "./PhotoGrid";

export default function AdminGalleryDetail() {
    const { albumId } = useParams();
    
    return (
        <>
        <div className="flex flex-col max-w-8xl mx-auto my-10 relative">
            <AlbumDetailHeader albumId={albumId} />
            <hr className="w-full my-4 border-2 border-gray-600"/>
            <PhotoGrid albumId={albumId} />
            <div className="flex justify-center text-center my-10">
                <div className="p-1 py-4 rounded-xl bg-bclightblue text-xl text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                    <Link to="/admin/gallery" className="px-9 py-3 border border-white rounded-lg">
                        목록
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}