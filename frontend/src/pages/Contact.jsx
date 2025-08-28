import React from "react";
import data from "../data/data.json"
import { FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";

const info = data.info;

export default function Contact() {
    return (
        <>
        <title>행사 문의 | 버드클라운</title>
        <meta name="description" content="생일파티, 지역행사, 기업 홍보, 축제 등 어떤 이벤트도 OK! 버드클라운에 문의하여 잊지 못할 하루를 계획해보세요. 전국 24시간 상담/출장 가능!" />
        <meta property="og:type" content="article" /> 
        <meta property="og:title" content="행사 문의 | 버드클라운" />
        <meta property="og:description" content="버드클라운에 문의하여 잊지 못할 하루를 계획해보세요. 전국 24시간 상담/출장 가능!" />
        <meta property="og:image" content="https://birdclown.kr/BIRDCLOWN3.png" />
        <meta property="og:url" content="https://birdclown.kr/contact" />
        <img src={info.img} alt="행사 문의 배너" className="w-full h-[180px] md:h-[300px] 2xl:h-[400px] object-cover" />
        <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl mb-6">
                <span className="text-3xl md:text-5xl 2xl:text-6xl text-bcgreen">행</span>사 문의
            </h1>
            <hr className="w-full mb-8 border md:border-2 border-gray-600"/>
            <div className="text-xl md:text-2xl 2xl:text-4xl">
                {info.lines.map((_, idx) => (
                    <p key={idx}>{info.lines[idx]}</p>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full my-10 md:my-40 text-center text-xl md:text-2xl 2xl:text-3xl gap-4">
                <div className="w-full md:w-full p-1 rounded-2xl bg-bcyellow
                    transition-transform duration-300 hover:scale-105 hover:z-10">
                    <a href={`tel:${info.tel}`}
                        className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                    >
                        <FaPhoneAlt /> {info.tel}
                    </a>
                </div>
                <div className="w-full p-1 rounded-2xl bg-bcblue
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
        </>
    )
}