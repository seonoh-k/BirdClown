import React from "react";
import data from "../data/data.json"
import { FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";

const info = data.info;

export default function Contact() {
    return (
        <>
        <img src={info.img} className="w-full h-[180px] md:h-[400px] object-cover" />
        <div className="flex flex-col max-w-[400px] md:max-w-6xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-3xl md:text-5xl md:text-5xl mb-6">
                <span className="text-4xl md:text-6xl md:text-6xl text-bcgreen">C</span>ontact Us
            </h1>
            <hr className="w-full mb-14 border md:border-2 border-gray-600"/>
            <div className="text-2xl md:text-4xl">
                {info.lines.map((_, idx) => (
                    <p key={idx}>{info.lines[idx]}</p>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full my-10 md:my-40 text-center text-2xl md:text-3xl gap-4">
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