import React from "react";
import { Link } from 'react-router-dom';

export default function Sidebar({ active, onClose }) {
    return (
        <>
        {active && (
            <div className='fixed inset-0 z-30' onClick={onClose} />
        )}
        <div className={`md:hidden fixed top-0 right-0 w-full h-[350px] bg-bcsoftblue z-40
            p-6 my-1 border-y-2 border-bcdeepblue
            transition-transform duration-300 ${active ? 'translate-y-0' : 'translate-y-[-360px]'}`}>
            <div className="">
                <ul className="flex flex-col text-lg items-center text-center font-semibold space-y-4">
                    <li>
                        <Link to="/">
                            <img src="/BIRDCLOWN3.png" className="w-[200px] md:w-[250px]" />
                        </Link>
                    </li>
                    <li>
                        <Link to='/' onClick={onClose} className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">메인</Link>
                    </li>
                    <li>
                        <Link to='/about' onClick={onClose} className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">팀 소개</Link>
                    </li>
                    <li>
                        <Link to='/services' onClick={onClose} className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">서비스 소개</Link>
                    </li>
                    <li>
                        <Link to='/gallery' onClick={onClose} className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">갤러리</Link>
                    </li>
                    <li>
                        <Link to='/contact' onClick={onClose} className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">행사 문의</Link>
                    </li>
                    <li>
                        <Link to="/admin" onClick={onClose} className="border-b-4 border-transparent hover:border-bcblue transition-colors duration-300">Admin</Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}