import React from "react";
import { Link } from "react-router-dom";
import ImgSlide from "./ServicesImgSlide";
import data from "../data/data.json";

const booth = data.service.booth;
const classname = [
    "w-[20px] h-full bg-[#fed455] opacity-80",
    "w-[20px] h-full bg-[#2b77c9] opacity-80",
    "w-[20px] h-full bg-[#fb4140] opacity-80"
]

export default function Booth() {
    return (
        <>
        <div className="flex my-6 text-lg gap-4">
            {booth.map((i, idx) => (
                <a key={idx} href={`#section-${idx}`} className="text-gray-700 hover:text-gray-300">{i.title}</a>
            ))}
        </div>
        <div className="flex flex-col mt-6 gap-6">
            {booth.map((i, idx) => (
                <div key={idx} id={`section-${idx}`} className="flex justify-between">
                    <div className="flex w-[700px] justify-center items-center">
                        <div className={classname[idx]}></div>
                        <div className="flex flex-col w-[500px] ml-12 my-10">
                            <h2 className="text-4xl">{i.title}</h2>
                            <span className="text-2xl mt-10">{i.content}</span>
                        </div>
                    </div>
                    <ImgSlide img={i.img} />
                </div>
            ))}
        </div>
        </>
    )
}