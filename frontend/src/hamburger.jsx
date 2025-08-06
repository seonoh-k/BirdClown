import React from "react";

export default function Hamburger({ active, onClick}) {
    return (
        <>
        <button type='button' 
            className={`md:hidden w-5 h-5 flex flex-col justify-center items-center z-50`} 
            onClick={onClick}>
            <div className={`w-5 h-1 bg-gray-700 rounded transition-all duration-300
                ${active ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'}`} />
            <div className={`w-5 h-1 bg-gray-700 rounded my-1 transition-all duration-300
                ${active ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-1 bg-gray-700 rounded transition-all duration-300
                ${active ? '-rotate-45 -translate-y-2' : '-rotate-0 -translate-y-0'}`} />    
        </button>
        </>
    )
}