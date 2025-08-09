import React from "react";
import data from "../data/data.json"
import { FaSquareInstagram } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope, FaMoneyCheck } from "react-icons/fa";

const info = data.info;

export default function Contact() {
    return (
        <div className="flex flex-col mx-40 my-10 items-center text-center">
            <h1 className="text-5xl mb-20">Contact Us</h1>
            <p className="text-2xl">{info.line}</p>
            <div className="grid grid-cols-2 mt-28 justify-center text-center gap-4">
                <a href={`tel:${info.tel}`}
                    className="flex w-[420px] px-10 py-6 text-2xl justify-center items-center rounded-xl bg-[#fed455] opacity-90 hover:opacity-80 gap-4"
                >
                    <FaPhoneAlt /> {info.tel}
                </a>
                <a href={`mailto:${info.email}`}
                    className="flex w-[420px] px-10 py-6 text-2xl justify-center items-center rounded-xl bg-[#2b77c9] opacity-90 hover:opacity-80 gap-4"
                >
                    <FaEnvelope /> {info.email}
                </a>
                <a href={info.insta}
                    className="flex w-[420px] px-10 py-6 text-2xl justify-center items-center rounded-xl bg-[#2b77c9] opacity-90 hover:opacity-80 gap-4"
                >
                    <FaSquareInstagram /> instagram
                </a>
                <a href="#"
                    className="flex w-[420px] px-10 py-6 text-2xl justify-center items-center rounded-xl bg-[#fb4140] opacity-90 hover:opacity-80 gap-4"
                >
                    <FaMoneyCheck /> {info.bank}
                </a>
            </div>
        </div>
    )
}