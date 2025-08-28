import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlbumAPI } from "../hooks/useAlbumAPI";
import LoadingSpinner from "./LodaingSpinner";
import data from "../data/data.json";

const img = data.gallery.img;

export default function Gallery() {
    const url = "/api/r2/presigned-url?objectKey=";
    const { getAlbums, albums, albumPage, isAlbumLast, isAlbumLoading, albumError } = useAlbumAPI();

    useEffect(() => {
        getAlbums(0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if(isAlbumLast) return;
            
            if(isAlbumLoading) return;

            if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 200) {
            const nextPage = albumPage + 1;
            getAlbums(nextPage);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {window.removeEventListener("scroll", handleScroll)}
    }, [isAlbumLast, albumPage, isAlbumLoading])

    return (
        <>
        <title>갤러리 | 버드클라운</title>
        <meta name="description" content="생생한 웃음과 화려한 퍼포먼스가 가득했던 버드클라운의 행사 현장을 사진으로
            만나보세요. 다음 이벤트의 주인공은 바로 당신입니다" />
        <meta property="og:type" content="article" /> 
        <meta property="og:title" content="갤러리 | 버드클라운" />
        <meta property="og:description" content="생생한 웃음과 화려한 퍼포먼스가 가득했던 버드클라운의 행사 현장을 사진으로
            만나보세요." />
        <meta property="og:image" content="https://birdclown.kr/BIRDCLOWN3.png" />
        <meta property="og:url" content="https://birdclown.kr/gallery" />
        <img src={img} alt="갤러리 배너" className="w-full h-[180px] md:h-[300px] 2xl:h-[500px] object-cover" />
        <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl mb-6">
                <span className="text-3xl md:text-5xl 2xl:text-6xl text-bcred">갤</span>러리
            </h1>
            <hr className="w-full mb-6 border md:border-2 border-gray-600"/>
            <div className="w-full">
                {albums && albums.length <= 0 && !isAlbumLoading && (
                    <p className="text-xl md:text-2xl 2xl:text-3xl text-bcred">등록된 앨범이 없습니다</p>
                )}
                <div className="flex items-center justify-center text-center">
                    {albums && isAlbumLoading && !isAlbumLast && (
                        <LoadingSpinner className="text-bcblue" />
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {albums.map((album) => (
                        <Link to={`/gallery/detail/${album.albumId}`} key={album.albumId}>
                            <img src={`${url}thumbnails/${album.fileName}`} 
                                className="w-full h-[170px] md:h-[245px] 2xl:h-[388px] object-cover rounded-lg shadow-lg
                                transition-transform duration-300 hover:scale-110 hover:z-10 " />
                            <div className="flex mt-1 justify-center">
                                {/* <span className="hidden md:block text-md">{album.eventDate}</span> */}
                                <span className="text-lg">{album.eventName}</span>
                            </div>
                        </Link>
                    ))}
                    <div className="flex items-center justify-center text-center">
                        {!albums && isAlbumLoading && !isAlbumLast && (
                            <LoadingSpinner className="text-bcblue" />
                        )}
                        {albumError && (
                            <div className="text-xl text-bcred">
                                {albumError}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}