import { React, useState, useRef, useEffect } from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { FaXmark } from "react-icons/fa6";

export default function KebabMenu({ items = [] }) {
    const [ isOpen, setOpen ] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handelClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            };
        }

        window.addEventListener("mousedown", handelClickOutside);
        return () => window.removeEventListener("mousedown", handelClickOutside);
    }, [menuRef]);

    return (
        <div ref={menuRef} className="absolute top-0 right-0">
            <button type="button" onClick={() => setOpen(!isOpen)} 
                className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-400">
                <GoKebabHorizontal />
            </button>
            {isOpen && (
                <div className="relative p-8 bg-white rounded-lg shadow-lg z-10">
                    <button onClick={() => setOpen(!isOpen)}
                        className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-400">
                        <FaXmark />
                    </button>
                    <ul className="flex flex-col justify-center items-center gap-2">
                        {items.map((item, idx) => (
                            <li key={idx}>
                                <button onClick={() => {
                                    item.onClick();
                                    setOpen(false);
                                }} className="flex gap-2 text-gray-700 hover:text-gray-400">
                                    {item.icon} {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}