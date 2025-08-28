import { React }from "react";
import { Link, useParams } from "react-router-dom";
import AlbumDetailHeader from "./AlbumDetailHeader";
import PhotoGrid from "./PhotoGrid";

export default function AdminGalleryDetail() {
    const { albumId } = useParams();
    
    return (
        <>
        <title>관리자 앨범 상세 | 버드클라운</title>
        <meta name="description" content="관리자용 앨범 관리" />
        <meta name="robots" content="noindex" />
        <meta property="og:type" content="article" /> 
        <meta property="og:title" content="관리자 앨범 상세 | 버드클라운" />
        <meta property="og:description" content="관리자용 앨범 관리" />
        <meta property="og:image" content="https://birdclown.kr/BIRDCLOWN3.png" />
        <meta property="og:url" content={`https://birdclown.kr/admin/gallery/detail/${albumId}`} />
        <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20 relative">
            <AlbumDetailHeader albumId={albumId} />
            <hr className="w-full mb-6 border md:border-2 border-gray-600"/>
            <PhotoGrid albumId={albumId} />
            <div className="flex justify-center text-center my-10">
                <div className="p-1 py-[10px] md:py-4 rounded-xl bg-bclightblue text-lg md:text-xl 2xl:text-2xl text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                    <Link to="/admin/gallery" className="px-3 py-2 md:px-6 md:py-3 border border-white rounded-lg">
                        목록
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}