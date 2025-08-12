import React from "react";
import { Link } from "react-router-dom";
import ImgSlide from "./ServicesImgSlide";
import data from "../data/data.json";

const booth = data.service.booth;
const classname = [
    "w-[20px] self-stretch bg-bcyellow",
    "w-[20px] self-stretch bg-bclightblue",
    "w-[20px] self-stretch bg-bclightblue",
    "w-[20px] self-stretch bg-bcred",
    "w-[20px] self-stretch bg-bcred"
]

export default function Booth() {
    return (
        <>
        <div className="flex mb-10 text-2xl text-gray-700 gap-4">
            {booth.map((i, idx) => (
                <a key={idx} href={`#section-${idx}`} 
                className="border-b-4 border-transparent hover:border-bcyellow transition-colors duration-300">
                    {i.title}
                </a>
            ))}
        </div>
        <div className="flex flex-col w-full mt-10">
            {booth.map((i, idx) => (
                <div key={idx} id={`section-${idx}`} className="flex my-8 justify-between items-center">
                    <div className={classname[idx]}></div>
                    <div className="flex flex-col w-1/2 my-10">
                        <h2 className="text-4xl">{i.title}</h2>
                        <span className="text-2xl mt-10">
                            {i.content.map((content, idx) => (
                                <p key={`booth-${idx}`}>{content}</p>
                            ))}
                        </span>
                    </div>
                    <ImgSlide img={i.img} />
                </div>
            ))}
        </div>
        </>
    )
}