import React from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";

const about = data.about;

export default function About() {
    return (
        <>
        <img src={about.img[2]} className="w-full h-[400px] object-cover" />
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center">
            <h1 className="text-5xl mb-6">
                <span className="text-[#fed455]">A</span>bout Us
            </h1>
            <hr className="w-full mb-14 border-2 border-gray-600"/>
            <div className="flex w-full justify-between items-center">
                <img src={about.img[1]} className="md:w-[600px] p-1 object-cover rounded-xl" />
                <div className="text-2xl text-center ml-20 space-y-3">
                    <img src={about.logo} className="w-[600px] mb-20" />
                    {about.lines.map((_, idx) => (
                        <p key={idx}>{about.lines[idx]}</p>
                    ))}
                </div>
            </div>
            <h1 className="text-5xl my-40">{about.subtitle}</h1>
            <div className="flex w-full justify-between items-center">
                <div className="text-2xl text-center space-y-3">
                    {about.lines2.map((_, idx) => (
                    <p key={idx}>{about.lines[idx]}</p>
                ))}
                </div>
                <img src={about.img[0]} className="md:w-[600px] object-cover rounded-xl" />
            </div>
            <h1 className="text-4xl my-20">왜 BIRD CLOWN인가?</h1>
            <div className="flex w-full items-center justify-between">
                {about.card.map((_, idx) => (
                    <div 
                        key={idx}
                        className="w-[250px] h-[300px] px-5 py-4 bg-bcdeepblue text-gray-200 rounded-xl shadow-xl
                                    flex flex-col justify-center items-center text-center relative"
                    >
                        <p className="text-2xl absolute top-6">{about.card[idx].title}</p>
                        <p className="text-xl mt-12">{about.card[idx].content}</p>
                    </div>
                ))}
            </div>
            <div className="my-20 text-2xl">
                {about.lines3.map((_, idx) => (
                    <p key={idx}>{about.lines3[idx]}</p>
                ))}
            </div>
            <Link to="/services" className="px-8 py-6 rounded-xl bg-bclightblue text-lg text-gray-200 opacity-90 hover:opacity-80 shadow-lg">
                서비스 소개
            </Link>
        </div>
        </>
    )
}