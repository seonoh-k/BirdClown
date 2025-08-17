import React from "react";
import { Link } from "react-router-dom";
import ImgSlide from "./ServicesImgSlide";
import data from "../data/data.json";

const show = data.service.show;
const classname = [
    "w-[20px] self-stretch bg-bcyellow",
    "w-[20px] self-stretch bg-bclightblue",
    "w-[20px] self-stretch bg-bcred"
]
const hrstyle = [
    "w-24 mb-6 border-2 border-bcyellow",
    "w-20 mb-6 border-2 border-bclightblue",
    "w-24 mb-6 border-2 border-bcred"
]

export default function Show() {
    return (
        <>
        <div className="hidden md:flex flex-col w-full items-center">
            <div className="flex mb-10 text-xl 2xl:text-2xl text-gray-700 gap-6">
                {show.map((i, idx) => (
                    <a key={idx} href={`#section-${idx}`} 
                    className="border-b-4 border-transparent hover:border-bcyellow transition-colors duration-300">
                        {i.title}
                    </a>
                ))}
            </div>
            <div className="flex flex-col w-full mt-10">
                {show.map((i, idx) => (
                    <div key={idx} id={`section-${idx}`} className="flex my-8 justify-between items-center">
                        <div className={classname[idx]}></div>
                        <div className="flex flex-col my-10">
                            <h2 className="text-3xl 2xl:text-5xl">{i.title}</h2>
                            <span className="text-xl 2xl:text-3xl mt-20">
                                {i.content.map((content, idx) => (
                                    <p key={`performance-${idx}`}>{content}</p>
                                ))}
                            </span>
                        </div>
                        <ImgSlide img={i.img} />
                    </div>
                ))}
            </div>
        </div>
        <div className="flex flex-col md:hidden w-full items-center">
            <div className="flex text-lg text-gray-700 gap-4">
                {show.map((i, idx) => (
                    <a key={idx} href={`#mobile-section-${idx}`} 
                    className="border-b-4 border-transparent hover:border-bcyellow transition-colors duration-300">
                        {i.title}
                    </a>
                ))}
            </div>
            <div className="flex flex-col w-full">
                {show.map((i, idx) => (
                    <div key={idx} id={`mobile-section-${idx}`} className="flex my-8 justify-between items-center">
                        <div className="flex flex-col items-center my-4">
                            <h2 className="text-2xl mb-1">{i.title}</h2>
                            <hr className={hrstyle[idx]}/>
                            <ImgSlide img={i.img} />
                            <span className="text-md md:text-2xl mt-10">
                                {i.content.map((content, idx) => (
                                    <p key={`performance-${idx}`}>{content}</p>
                                ))}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}