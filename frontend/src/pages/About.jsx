import React from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";
import CardSlide from "./AboutCardSlide";

const about = data.about;

export default function About() {
    return (
        <>
        <img src={about.img[2]} className="w-full h-[180px] md:h-[300px] 2xl:h-[400px] object-cover" />
        <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl mb-6">
                <span className="text-3xl md:text-5xl 2xl:text-6xl text-bcyellow">A</span>bout Us
            </h1>
            <hr className="w-full mb-8 border md:border-2 border-gray-600"/>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-gradient-to-b md:bg-gradient-to-r from-bcyellow rounded-2xl items-center gap-4">
                <img src={about.img[1]} className="w-full md:w-full object-cover rounded-2xl" />
                <div className="flex flex-col font-sacheon text-xl md:text-2xl 2xl:text-4xl my-10 items-center text-center gap-y-1 md:gap-y-3">
                    <img src={about.logo} className="w-[300px] md:w-[600px] mb-10" />
                    {about.lines.map((_, idx) => (
                        <p key={idx}>{about.lines[idx]}</p>
                    ))}
                </div>
            </div>
            <h1 className="text-2xl md:text-5xl 2xl:text-5xl font-rock my-20 md:my-40">{about.subtitle}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-gradient-to-t md:bg-gradient-to-l from-bcred rounded-2xl items-center">
                <div className="text-xl md:text-2xl 2xl:text-4xl font-sacheon text-center my-10 gap-y-1 md:gap-y-3">
                    {about.lines2.map((_, idx) => (
                        <p key={idx}>{about.lines2[idx]}</p>
                    ))}
                </div>
                <img src={about.img[0]} className="w-full md:w-full object-cover rounded-2xl" />
            </div>
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl my-10 md:my-40">왜 BIRD CLOWN인가?</h1>
            <div className="hidden flex w-full items-center justify-between">
                {about.card.map((card, idx) => (
                    <div 
                        key={`card-${idx}`}
                        className="w-[250px] h-[300px] px-5 py-4 bg-bcdeepblue text-gray-200 rounded-xl shadow-xl
                                    flex flex-col justify-center items-center text-center relative"
                    >
                        <p className="text-2xl absolute top-6">{card.title}</p>
                        <div className="text-xl mt-12">
                            {card.content.map((content, idx) => (
                                <p key={`content-${idx}`}>{content}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <CardSlide />
            <div className="my-10 md:my-20 text-lg md:text-2xl 2xl:text-4xl">
                {about.lines3.map((_, idx) => (
                    <p key={idx}>{about.lines3[idx]}</p>
                ))}
            </div>
            <div className="p-1 py-[10px] md:py-4 rounded-xl shadow-lg bg-bclightblue text-lg md:text-xl 2xl:text-2xl text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                <Link to="/services" className="px-3 py-2 md:px-6 md:py-3 border border-white rounded-lg">
                    서비스 소개
                </Link>
            </div>
        </div>
        </>
    )
}