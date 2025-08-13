import React from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";
import CardSlide from "./AboutCardSlide";

const about = data.about;

export default function About() {
    return (
        <>
        <img src={about.img[2]} className="w-full h-[180px] md:h-[400px] object-cover" />
        <div className="flex flex-col max-w-md md:max-w-8xl mx-4 md:mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-5xl mb-6">
                <span className="text-6xl text-bcyellow">A</span>bout Us
            </h1>
            <hr className="w-full mb-14 border-2 border-gray-600"/>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-gradient-to-b md:bg-gradient-to-r from-bcsoftyellow rounded-2xl items-center gap-4">
                <img src={about.img[1]} className="w-[500px] md:w-full p-1 object-cover rounded-2xl" />
                <div className="flex flex-col text-xl md:text-4xl my-10 items-center text-center gap-y-1 md:gap-y-3">
                    <img src={about.logo} className="w-[300px] md:w-[600px] mb-10" />
                    {about.lines.map((_, idx) => (
                        <p key={idx}>{about.lines[idx]}</p>
                    ))}
                </div>
            </div>
            <h1 className="text-2xl md:text-5xl my-20 md:my-40">{about.subtitle}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full bg-gradient-to-t md:bg-gradient-to-l from-bcsoftred rounded-2xl items-center">
                <div className="text-xl md:text-4xl text-center my-10 gap-y-1 md:gap-y-3">
                    {about.lines2.map((_, idx) => (
                        <p key={idx}>{about.lines2[idx]}</p>
                    ))}
                </div>
                <img src={about.img[0]} className="w-[500px] md:w-full p-1 object-cover rounded-2xl" />
            </div>
            <h1 className="text-2xl md:text-5xl my-20 md:my-40">왜 BIRD CLOWN인가?</h1>
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
            <div className="my-10 md:my-20 text-xl md:text-4xl">
                {about.lines3.map((_, idx) => (
                    <p key={idx}>{about.lines3[idx]}</p>
                ))}
            </div>
            <div className="p-1 py-3 md:py-4 rounded-2xl shadow-lg bg-bclightblue text-xl md:text-2xl text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                <Link to="/services" className="px-3 py-2 md:px-6 md:py-3 border border-white rounded-xl">
                    서비스 소개
                </Link>
            </div>
        </div>
        </>
    )
}