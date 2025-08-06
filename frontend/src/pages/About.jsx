import React from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";

const about = data.about;

export default function About() {
    return (
        <div className="flex flex-col mx-40 my-10 items-center text-center">
            <h1 className="text-5xl mb-6">About Us</h1>
            <img src={about.logo} className="w-[700px] mb-10" />
            <div className="text-2xl text-center space-y-3">
                {about.lines.map((_, idx) => (
                    <p key={idx}>{about.lines[idx]}</p>
                ))}
            </div>
            <h1 className="text-4xl my-20">{about.subtitle}</h1>
            <div className="grid grid-cols-2 items-center gap-2">
                <div className="text-xl text-center space-y-2">
                    {about.lines2.map((_, idx) => (
                    <p key={idx}>{about.lines[idx]}</p>
                ))}
                </div>
                <div className="gap-2">
                    <div className="flex">
                        <img src={about.img[1]} className="md:w-[250px] p-1 object-cover" />
                        <img src={about.img[0]} className="md:w-[250px] p-1 object-cover" />
                    </div>
                    <img src={about.img[2]} className="md:w-[500px] h-[200px] p-1 object-cover" />
                </div>
            </div>
            <h1 className="text-4xl my-20">왜 BIRD CLOWN인가?</h1>
            <div className="flex flex-wrap items-center justify-center gap-3">
                {about.card.map((_, idx) => (
                    <div 
                        key={idx}
                        className="w-[250px] h-[300px] px-5 py-4 bg-[#a9c7e9] text-gray-700 rounded-xl shadow-lg
                                    flex flex-col justify-center items-center text-center relative"
                    >
                        <p className="text-2xl absolute top-6">{about.card[idx].title}</p>
                        <p className="text-xl mt-12">{about.card[idx].content}</p>
                    </div>
                ))}
            </div>
            <div className="my-20 text-2xl">
                {about.lines3.map((_, idx) => (
                    <p>{about.lines3[idx]}</p>
                ))}
            </div>
            <Link to="/services" className="px-6 py-4 rounded-xl bg-[#2b77c9] text-gray-200 opacity-90 hover:opacity-80">
                서비스 소개
            </Link>
        </div>
    )
}