import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAlbumAPI } from "../hooks/useAlbumAPI";
import LoadingSpinner from "./LodaingSpinner";
import data from "../data/data.json";

const img = data.gallery.img;

export default function Gallery() {
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const { getAlbums, albums, albumPage, isAlbumLast, isAlbumLoading, albumError } = useAlbumAPI();

    useEffect(() => {
        getAlbums(0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if(isAlbumLoading && isAlbumLast) return;

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
        <img src={img} className="w-full h-[180px] md:h-[400px] object-cover" />
        <div className="flex flex-col max-w-[400px] md:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-3xl md:text-5xl mb-6">
                <span className="text-4xl md:text-6xl text-bcred">G</span>allery
            </h1>
            <hr className="w-full mb-14 border md:border-2 border-gray-600"/>
            <div className="w-full">
                {albums && albums.length <= 0 && !isAlbumLoading && (
                    <p className="text-2xl md:text-3xl text-bcred">등록된 앨범이 없습니다</p>
                )}
                <div className="flex items-center justify-center text-center">
                    {albums && isAlbumLoading && !isAlbumLast && (
                        <LoadingSpinner className="text-bcblue" />
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
                    {albums.map((album) => (
                        <Link to={`/gallery/detail/${album.albumId}`} key={album.albumId}>
                            <img src={`${url}thumbnails/${album.fileName}`} 
                                className="w-[185px] md:w-full h-[185px] md:h-[330px] object-cover rounded-lg shadow-lg
                                transition-transform duration-300 hover:scale-110 hover:z-10 " />
                            <div className="flex mt-1 justify-center md:justify-between">
                                <span className="hidden md:block text-xl">{album.eventDate}</span>
                                <span className="text-xl">{album.eventName}</span>
                            </div>
                        </Link>
                    ))}
                    <div className="flex items-center justify-center text-center">
                        {!albums && isAlbumLoading && !isAlbumLast && (
                            <LoadingSpinner className="text-bcblue" />
                        )}
                        {albumError && (
                            <div className="text- xl text-bcred">
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