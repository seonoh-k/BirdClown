import { React } from "react";
import { Link } from "react-router-dom";
import HomeImgSlide from "./HomeImgSlide.jsx"
import { FaAngleLeft, FaAngleRight, FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";
import data from "../data/data.json";

export default function Home() {
    const main = data.main;
    const info = data.info;

    return (
        <>
        <HomeImgSlide />
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center">
            <img src={main.logo} className="w-[700px] mb-10" />
            <h3 className="text-4xl">{main.subtitle}</h3>
            <div className="mt-8 text-2xl text-center space-y-3">
                {main.lines.map((_, idx) => (
                    <p key={main.lines[idx]}>{main.lines[idx]}</p>
                ))}
            </div>
            <div className="relative w-full my-10">
                <h3 className="text-5xl text-center mb-8">Gallery</h3>
                <hr className="mb-8 border-2 border-gray-600"/>
                <Link to="/gallery" className="absolute top-12 right-0 text-md">더보기</Link>
                <div>
                    <div className="flex flex-wrap items-center justify-between">
                        {[...Array(4)].map((_, idx) => (
                            <Link to="/gallery/detail" key={idx}>
                                <img src="./images/services/1.jpg" className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] object-cover rounded-lg" />
                                <div className="flex justify-between">
                                    <span className="text-lg">20xx-xx</span>
                                    <span className="text-lg">장소 행사명</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full my-10">
                <h3 className="text-5xl text-center mb-8">행사 일정</h3>
                <hr className="mb-8 border-2 border-gray-600"/>
                <div className="w-full h-[300px] rounded-lg bg-gray-800 text-white text-center">Calander API</div>
            </div>
            <div className="w-full my-10">
                <h3 className="text-5xl text-center mb-8">Contact</h3>
                <hr className="mb-8 border-2 border-gray-600"/>
                <div className="grid grid-cols-2 my-10 text-center gap-4">
                    <a href={`tel:${info.tel}`}
                        className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcyellow hover:bg-opacity-90 gap-4"
                    >
                        <FaPhoneAlt /> {info.tel}
                    </a>
                    <a href={`mailto:${info.email}`}
                        className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcblue hover:bg-opacity-90 gap-4"
                    >
                        <FaEnvelope /> {info.email}
                    </a>
                    <a href={info.insta}
                        className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcblue hover:bg-opacity-90 gap-4"
                    >
                        <FaSquareInstagram /> instagram
                    </a>
                    <a href="#"
                        className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcred hover:bg-opacity-90 gap-4"
                    >
                        <FaMoneyCheck /> {info.bank}
                    </a>
                </div>
            </div>
        </div>
        </>
    )
}