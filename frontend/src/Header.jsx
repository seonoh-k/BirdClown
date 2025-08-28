import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hamburger from "./hamburger";
import Sidebar from "./sidebar";

export default function Header({ isLogin, handleLogout }) {
    const [ active, setActive ] = useState(false);
    const navigate = useNavigate();

    const onLogout = async () => {
        const success = await handleLogout();

        if(success) {
            navigate("/");
        }
    }
    return (
        <header className="fixed top-0 w-full py-6 my-1 z-40 bg-bcsoftblue bg-opacity-90 border-y-2 border-bcdeepblue text-gray-600">
            <div className="flex max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto justify-between md:items-center font-cafe relative">
                <Link to="/">
                    <img src="/BIRDCLOWN3.png" alt="헤더 로고" className="w-[200px] md:w-[220px] 2xl:w-[250px]" />
                </Link>
                <div className="hidden md:flex flex-1 ml-10 items-center">
                    <nav className="text-lg 2xl:text-xl text-gray-700 space-x-8">
                        <Link to="/" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">메인</Link>
                        <Link to="/about" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">팀 소개</Link>
                        <Link to="/services" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">서비스 소개</Link>
                        <Link to="/gallery" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">갤러리</Link>
                        <Link to="/contact" className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">행사 문의</Link>
                    </nav>
                </div>
                <div>
                    {isLogin
                        ? <button onClick={onLogout} 
                            className="text-sm text-gray-700 border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
                            로그아웃
                        </button>
                        : <Link to="/admin" 
                            className="hidden md:block text-sm text-gray-700 border-b-2 border-transparent hover:border-bcred transition-colors duration-300">
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