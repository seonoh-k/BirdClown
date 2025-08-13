import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeImgSlide from "./HomeImgSlide.jsx"
import LoadingSpinner from "./LodaingSpinner.jsx";
import { FaAngleLeft, FaAngleRight, FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";
import data from "../data/data.json";
import { useAlbumAPI } from "../hooks/useAlbumAPI.js"

export default function Home() {
    const main = data.main;
    const info = data.info;
    const url = "https://pub-808cfb4601584b8f9f2a47c583f737d3.r2.dev/";
    const { getMainAlbums, albums, isAlbumLoading, albumError } = useAlbumAPI();

    useEffect(() => {
        getMainAlbums();
    }, [])

    return (
        <div>
            <HomeImgSlide />
            <div className="flex flex-col max-w-md md:max-w-8xl mx-4 md:mx-auto my-10 md:my-20 items-center text-center">
                <img src={main.logo} className="w-[300px] md:w-[700px] mb-10" />
                <h3 className="text-2xl md:text-4xl">{main.subtitle}</h3>
                <div className="mt-8 text-md md:text-2xl text-center space-y-3">
                    {main.lines.map((_, idx) => (
                        <p key={main.lines[idx]}>{main.lines[idx]}</p>
                    ))}
                </div>
                <div className="relative w-full my-10">
                    <h3 className="text-4xl md:text-5xl text-center mb-8">Gallery</h3>
                    <hr className="mb-8 border-2 border-gray-600"/>
                    <Link to="/gallery" className="absolute top-12 right-0 text-sm md:text-md
                        border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
                        더보기
                    </Link>
                    <div>
                        <div className="flex flex-wrap items-center justify-between">
                            {albums?.map((album) => (
                                <Link to={`/gallery/detail/${album.albumId}`} key={album.albumId}>
                                    <img src={`${url}${album.objectKey}`} 
                                        className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] object-cover rounded-lg shadow-lg cursor-pointer
                                        transition-transform duration-300 hover:scale-105 hover:z-10" />
                                    <div className="flex justify-between">
                                        <span className="text-md md:text-lg">{album.eventDate}</span>
                                        <span className="text-md md:text-lg">{album.eventName}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {isAlbumLoading && (
                            <LoadingSpinner className="text-bcblue" />
                        )}
                        {albumError && (
                            <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-lg shadow-lg">
                                {albumError}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full mx-auto md:w-full my-10">
                    <h3 className="text-4xl md:text-5xl text-center mb-8">행사 일정</h3>
                    <hr className="mb-8 border-2 border-gray-600"/>
                    <div className="w-full h-[300px] rounded-lg bg-gray-800 text-white text-center">Calander API</div>
                </div>
                <div className="w-full my-10">
                    <h3 className="text-4xl md:text-5xl text-center mb-8">Contact</h3>
                    <hr className="mb-8 border-2 border-gray-600"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 my-10 text-center text-xl md:text-3xl gap-4">
                        <div className="w-full md:w-full p-1 rounded-2xl bg-bcyellow
                            transition-transform duration-300 hover:scale-105 hover:z-10">
                            <a href={`tel:${info.tel}`}
                                className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                            >
                                <FaPhoneAlt /> {info.tel}
                            </a>
                        </div>
                        <div className="w-full md:w-full p-1 rounded-2xl bg-bcblue
                            transition-transform duration-300 hover:scale-105 hover:z-10">
                            <a href={`mailto:${info.email}`}
                                className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                            >
                                <FaEnvelope /> {info.email}
                            </a>
                        </div>
                        <div className="w-full md:w-full p-1 rounded-2xl bg-bcblue
                            transition-transform duration-300 hover:scale-105 hover:z-10">
                            <a href={info.insta}
                                className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                            >
                                <FaSquareInstagram /> instagram
                            </a>
                        </div>
                        <div className="w-full md:w-full p-1 rounded-2xl bg-bcred
                            transition-transform duration-300 hover:scale-105 hover:z-10">
                            <a href="#"
                                className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                            >
                                <FaMoneyCheck /> {info.bank}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}