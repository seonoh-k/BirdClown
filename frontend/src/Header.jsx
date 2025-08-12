import { React, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";

export default function Header() {
    const [ active, setActive ] = useState(false);

    return (
        <header className="fixed top-0 inset-x-0 w-full z-40 py-6 my-1 bg-bcsoftblue bg-opacity-80 border-y-2 border-gray-600 text-gray-600">
            <div className="flex max-w-8xl mx-auto items-center">
                <Link to="/">
                    <img src="/BIRDCLOWN3.png" className="w-[250px]" />
                </Link>
                <div className="hidden md:flex flex-1 ml-10 items-center">
                    <nav className="text-xl text-gray-700 text-bold space-x-8">
                        <Link to="/" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Home</Link>
                        <Link to="/about" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">About</Link>
                        <Link to="/services" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Services</Link>
                        <Link to="/gallery" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Gallery</Link>
                        <Link to="/contact" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Contact</Link>
                    </nav>
                </div>
                <div className="hidden md:block">
                    <Link to="/admin" 
                        className="text-sm text-gray-700 border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
                        관리자 로그인
                    </Link>
                </div>
                <Hamburger active={active} onClick={() => setActive(v => !v)}/>
                <Sidebar active={active} onClose={() => setActive(false)} />    
            </div>
        </header>
    )
}