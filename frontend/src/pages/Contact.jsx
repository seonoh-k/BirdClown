import React from "react";
import data from "../data/data.json"
import { FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";

const info = data.info;

export default function Contact() {
    return (
        <>
        <img src={info.img} className="w-full h-[400px] object-cover" />
        <div className="flex flex-col max-w-md md:max-w-8xl mx-4 md:mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-5xl mb-6">
                <span className="text-6xl text-bcgreen">C</span>ontact Us
            </h1>
            <hr className="w-full my-8 border-2 border-gray-600"/>
            <p className="text-3xl">{info.line}</p>
            <div className="grid grid-cols-2 w-full my-10 text-center gap-4">
                <div className="w-full p-1 text-3xl rounded-2xl bg-bcyellow
                    transition-transform duration-300 hover:scale-105 hover:z-10">
                    <a href={`tel:${info.tel}`}
                        className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                    >
                        <FaPhoneAlt /> {info.tel}
                    </a>
                </div>
                <div className="w-full p-1 text-3xl rounded-2xl bg-bcblue
                    transition-transform duration-300 hover:scale-105 hover:z-10">
                    <a href={`mailto:${info.email}`}
                        className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                    >
                        <FaEnvelope /> {info.email}
                    </a>
                </div>
                <div className="w-full p-1 text-3xl rounded-2xl bg-bcblue
                    transition-transform duration-300 hover:scale-105 hover:z-10">
                    <a href={info.insta}
                        className="flex py-5 justify-center items-center rounded-xl border border-white gap-4"
                    >
                        <FaSquareInstagram /> instagram
                    </a>
                </div>
                <div className="w-full p-1 text-3xl rounded-2xl bg-bcred
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