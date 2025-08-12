import React from "react";
import { Link } from "react-router-dom";
import data from "./data/data.json"; 

export default function Footer() {
    const info = data.info;

    return (
        <footer className="relative w-full py-2 bg-bcgreen">
            <div className="py-2 border-t-2 border-dashed border-gray-400">
                <div className="flex max-w-8xl mx-auto justify-between">
                    <div className="flex jusity-center items-center">
                        <div>
                            <h2 className="text-2xl">BIRD CLOWN</h2>
                            <p>대표: {info.ceo}</p>
                            <p>사업자등록번호: {info.no}</p>
                            <p>Email: {info.email}</p>
                        </div>
                        <div className="ml-20">
                            <h2 className="text-2xl mb-2">사이트맵</h2>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-lg">
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/services">Services</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <img src={info.logo2} className="w-[150px] h-[150px] ml-32" />
                </div>
                <div className="absolute flex bottom-4 left-1/2 -translate-x-1/2 text-center text-sm whitespace-nowrap">
                    <span>© 2025 BirdClown. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}