import { React, useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";

export default function Header() {
    const [ active, setActive ] = useState(false);

    return (
        <header className="w-full py-6 my-1 border-y-2 border-gray-600 text-gray-600">
            <div className="flex max-w-8xl mx-auto items-center">
                <Link to="/">
                    <img src="/BIRDCLOWN3.png" className="w-[250px]" />
                </Link>
                <div className="hidden md:flex flex-1 ml-10 items-center">
                    <nav className="text-xl text-semibold space-x-8">
                        <Link to="/" className="text-gray-700 hover:border-b-4 border-bcblue">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:border-b-4 border-bcblue">About</Link>
                        <Link to="/services" className="text-gray-700 hover:border-b-4 border-bcblue">Services</Link>
                        <Link to="/gallery" className="text-gray-700 hover:border-b-4 border-bcblue">Gallery</Link>
                        <Link to="/contact" className="text-gray-700 hover:border-b-4 border-bcblue">Contact</Link>
                    </nav>
                </div>
                <div className="hidden md:block">
                    <Link to="/admin" 
                        className="text-sm text-gray-700 hover:border-b-2 border-bcblue">
                        관리자 메뉴
                    </Link>
                </div>
                <Hamburger active={active} onClick={() => setActive(v => !v)}/>
                <Sidebar active={active} onClose={() => setActive(false)} />    
            </div>
        </header>
    )
}