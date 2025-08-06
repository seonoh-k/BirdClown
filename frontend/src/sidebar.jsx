import React from "react";
import { Link } from 'react-router-dom';

export default function Sidebar({ active, onClose }) {
    return (
        <>
        {active && (
            <div className='fixed inset-0 z-30' onClick={onClose} />
        )}
        <div className={`md:hidden fixed top-0 right-0 w-48 h-full bg-gray-200 opacity-90 z-40
            transition-transform duration-300 ${active ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className="flex flex-col mt-8 p-8 text-lg font-semibold items-center space-y-4">
                <li>
                    <Link to='/' onClick={onClose}>Home</Link>
                </li>
                <li>
                    <Link to='/about' onClick={onClose}>About</Link>
                </li>
                <li>
                    <Link to='/services' onClick={onClose}>Services</Link>
                </li>
                <li>
                    <Link to='/gallery' onClick={onClose}>Gallery</Link>
                </li>
                <li>
                    <Link to='/contact' onClick={onClose}>Contact</Link>
                </li>
            </ul>
            <Link to="/admin" onClick={onClose}>관리자 메뉴</Link>
        </div>
        </>
    )
}