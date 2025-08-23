import React from "react";
import { Link } from "react-router-dom";
import data from "./data/data.json"; 

export default function Footer() {
    const info = data.info;

    return (
        <footer className="relative w-full py-2 bg-bcgreen">
            <div className="py-2 border-t-2 font-sacheon border-dashed border-gray-400">
                <div className="flex max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto justify-between">
                    <div className="flex jusity-center items-center">
                        <div className="text-sm md:text-lg 2xl:text-xl">
                            <h2>BIRD CLOWN</h2>
                            <p>단장: {info.ceo}</p>
                            <p>사업자등록번호: {info.no}</p>
                            <p>Email: {info.email}</p>
                        </div>
                    </div>
                    <img src={info.logo2} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] my-auto" />
                </div>
                <div className="absolute flex bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 text-center text-[10px] md:text-sm whitespace-nowrap">
                    <span>© 2025 BirdClown. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}