import { React, useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function TopBtn() {
    const [ isVisible, setIsVisible ] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if(window.scrollY > 300) {
                setIsVisible(true);
            }else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return(
        isVisible && (
            <button onClick={scrollToTop} 
                className="fixed flex items-center bottom-10 right-10 p-3 bg-[#cfead9] text-gray-600 rounded-full shadow-lg hover:bg-[#2b77c9] hover:text-white transition"
            >
                <FaArrowUp />
            </button>
        )
    )
}