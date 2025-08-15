import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";
import { useLoginAPI } from "./hooks/useLoginAPI";

export default function Header() {
    const [ active, setActive ] = useState(false);
    const { isLogin, handleLogout } = useLoginAPI();
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 w-full py-6 my-1 z-40 bg-bcsoftblue bg-opacity-90 border-y-2 border-bcdeepblue text-gray-600">
            <div className="flex max-w-[400px] md:max-w-8xl mx-auto justify-between md:items-center relative">
                <Link to="/">
                    <img src="/BIRDCLOWN3.png" className="w-[200px] md:w-[250px]" />
                </Link>
                <div className="hidden md:flex flex-1 ml-10 items-center">
                    <nav className="text-xl text-gray-700 font-semibold space-x-8">
                        <Link to="/" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Home</Link>
                        <Link to="/about" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">About</Link>
                        <Link to="/services" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Services</Link>
                        <Link to="/gallery" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Gallery</Link>
                        <Link to="/contact" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Contact</Link>
                    </nav>
                </div>
                <div className="hidden md:block">
                    {isLogin
                        ? <button onClick={handleLogout(navigate)} 
                            className="text-sm text-gray-700 border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
                            로그아웃
                        </button>
                        : <Link to="/admin" 
                            className="text-sm text-gray-700 border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
                            Admin
                        </Link>
                    }
                </div>
                <Hamburger active={active} onClick={() => setActive(v => !v)}/>
                <Sidebar active={active} onClose={() => setActive(false)} />    
            </div>
        </header>
    )
}