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
                className="fixed flex items-center z-20 bottom-6 right-6 p-3 md:p-6 bg-bclightblue text-gray-200 rounded-full shadow-xl hover:opacity-70 text-lg md:text-2xl transition"
            >
                <FaArrowUp />
            </button>
        )
    )
}