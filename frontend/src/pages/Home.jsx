import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeImgSlide from "./HomeImgSlide.jsx"
import LoadingSpinner from "./LodaingSpinner.jsx";
import Calendar from "./Calendar.jsx";
import { FaAngleLeft, FaAngleRight, FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";
import data from "../data/data.json";
import { useAlbumAPI } from "../hooks/useAlbumAPI.js"

export default function Home() {
    const main = data.main;
    const info = data.info;
    const url = "/api/r2/presigned-url?objectKey=";
    const { getMainAlbums, albums, isAlbumLoading, albumError } = useAlbumAPI();

    useEffect(() => {
        getMainAlbums();
    }, [])

    return (
        <div>
            <HomeImgSlide />
            <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
                <img src={main.logo} className="w-[300px] md:w-[700px]" />
                <h3 className="my-10 md:my-20 text-xl lg:text-5xl font-rock">{main.subtitle}</h3>
                <div className="text-sm md:text-xl lg:text-3xl text-center space-y-3 md:mb-20">
                    {main.lines.map((_, idx) => (
                        <p key={main.lines[idx]}>{main.lines[idx]}</p>
                    ))}
                </div>
                <div className="relative w-full my-10">
                    <h3 className="text-2xl md:text-5xl text-center mb-8">갤러리</h3>
                    <hr className="mb-8 border md:border-2 border-gray-600"/>
                    <Link to="/gallery" className="absolute top-12 right-0 text-sm md:text-md
                        border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
                        더보기
                    </Link>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {albums?.map((album) => (
                                <Link to={`/gallery/detail/${album.albumId}`} key={album.albumId}>
                                    <img src={`${url}thumbnails/${album.fileName}`} 
                                        className="w-full h-[170px] md:h-[245px] 2xl:h-[388px] object-cover rounded-lg shadow-lg cursor-pointer
                                        transition-transform duration-300 hover:scale-105 hover:z-10" />
                                    <div className="flex mt-1 justify-center">
                                        {/* <span className="hidden md:block text-md">{album.eventDate}</span> */}
                                        <span className="text-md">{album.eventName}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {isAlbumLoading && (
                            <LoadingSpinner className="text-bcblue" />
                        )}
                        {albumError && (
                            <div className="w-[170px] md:w-[300px] h-[170px] md:h-[300px] rounded-lg shadow-lg">
                                {albumError}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full mx-auto md:w-full my-10 md:my-20">
                    <h3 className="text-2xl md:text-5xl text-center mb-8">행사 일정</h3>
                    <hr className="mb-8 border md:border-2 border-gray-600"/>
                    <div  className="w-full font-neo text-sm md:text-xl">
                        <Calendar />
                    </div>
                </div>
                <div className="w-full my-10">
                    <h3 className="text-2xl md:text-5xl text-center mb-8">행사 문의</h3>
                    <hr className="mb-8 border md:border-2 border-gray-600"/>
                    <div className="grid grid-cols-1 md:grid-cols-2 my-10 text-center text-xl md:text-2xl 2xl:text-3xl gap-4">
                        <div className="w-full p-1 rounded-2xl bg-bcyellow
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