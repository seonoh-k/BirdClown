import React from "react";
import data from "../data/data.json"
import { FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";

const info = data.info;

export default function Contact() {
    return (
        <>
        <img src={info.img} className="w-full h-[400px] object-cover" />
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center">
            <h1 className="text-5xl mb-6">
                <span className="text-6xl text-bcgreen">C</span>ontact Us
            </h1>
            <hr className="w-full my-8 border-2 border-gray-600"/>
            <p className="text-3xl">{info.line}</p>
            <div className="grid grid-cols-2 my-10 text-center gap-4">
                <a href={`tel:${info.tel}`}
                    className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcyellow
                    transition-transform duration-300 hover:scale-105 hover:z-10 gap-4"
                >
                    <FaPhoneAlt /> {info.tel}
                </a>
                <a href={`mailto:${info.email}`}
                    className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcblue 
                    transition-transform duration-300 hover:scale-105 hover:z-10 gap-4"
                >
                    <FaEnvelope /> {info.email}
                </a>
                <a href={info.insta}
                    className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcblue 
                    transition-transform duration-300 hover:scale-105 hover:z-10 gap-4"
                >
                    <FaSquareInstagram /> instagram
                </a>
                <a href="#"
                    className="flex w-full py-6 text-3xl justify-center items-center rounded-xl bg-bcred 
                    transition-transform duration-300 hover:scale-105 hover:z-10 gap-4"
                >
                    <FaMoneyCheck /> {info.bank}
                </a>
            </div>
        </div>
        </>
    )
}