import React from "react";
import { Link } from "react-router-dom";

const albums = [
    {
        albumId: "1",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/1.jpg"
    },
    {
        albumId: "2",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/2.jpg"
    },
    {
        albumId: "3",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/1.jpg"
    },
    {
        albumId: "4",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/2.jpg"
    },
    {
        albumId: "5",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/1.jpg"
    },
    {
        albumId: "6",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/2.jpg"
    },
    {
        albumId: "7",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/1.jpg"
    },
    {
        albumId: "8",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/2.jpg"
    },
    {
        albumId: "9",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/1.jpg"
    },
    {
        albumId: "10",
        title: "장소 행사명",
        date: "2025-08-09",
        filename: "/images/services/2.jpg"
    },
];

export default function Gallery() {
    return (
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center">
            <h1 className="text-5xl mb-20">
                <span className="text-[#fb4140]">G</span>allery
            </h1>
            <div>
                <div className="flex flex-wrap items-center gap-8">
                    {albums.map((album) => (
                        <Link to={`/gallery/detail/${album.albumId}`} key={album.albumId}>
                            <img src={album.filename} className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] object-cover rounded-lg shadow-lg" />
                            <div className="flex justify-between">
                                <span className="text-lg">{album.date}</span>
                                <span className="text-lg">{album.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}