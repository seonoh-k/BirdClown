import { React, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";

export default function Header() {
    const [ active, setActive ] = useState(false);

    return (
        <header className="flex items-center justify-center md:px-40 py-4 text-gray-600">
            <Link to="/">
                <img src="/BIRDCLOWN.png" className="w-[150px]" />
            </Link>
            <div className="hidden md:flex flex-1 items-center justify-center">
                <nav className="text-2xl text-semibold space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-gray-300">Home</Link>
                    <Link to="/about" className="text-gray-700 hover:text-gray-300">About</Link>
                    <Link to="/services" className="text-gray-700 hover:text-gray-300">Services</Link>
                    <Link to="/gallery" className="text-gray-700 hover:text-gray-300">Gallery</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-gray-300">Contact</Link>
                </nav>
            </div>
            <div>
                <Link to="/admin" className="text-base ml-16 text-gray-700 hover:text-gray-200">관리자 메뉴</Link>
            </div>
            <Hamburger active={active} onClick={() => setActive(v => !v)}/>
            <Sidebar active={active} onClose={() => setActive(false)} />    
        </header>
    )
}