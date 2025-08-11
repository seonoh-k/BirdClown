import { React, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function ImgSlide({ img }) {
    const [ imgIdx, setImgIdx ] = useState(0);
    const [ direction, setDirection ] = useState(0);
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isAnimating, setIsAnimating ] = useState(false);
    const timeoutRef = useRef(null);

    const updateIdx = (newDir) => {
        if(isAnimating) return;
        
        setDirection(newDir);
        setImgIdx((prevIdx) => (
            (prevIdx + newDir + img.length) % img.length
        ));
        setIsAnimating(true);
    };

    useEffect (() => {
        if(isHovered) return;

        timeoutRef.current = setInterval(() => {
            updateIdx(1);
        }, 4000);

        return () => clearInterval(timeoutRef.current);
    }, [img.length, isHovered])

    const swipeHandler = useSwipeable({
        onSwipedLeft: () => updateIdx(1),
        onSwipedRight: () => updateIdx(-1),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    })

    const handleAnimation = () => {
        setIsAnimating(false);
    }

    return (
        <div {...swipeHandler}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-[500px] h-[500px] flex justify-center items-center select-none"
            style={{ touchAction: "pan-y" }}
        >
            <div className="relative w-full h-full overflow-hidden rounded-xl">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={img[imgIdx]}
                        src={img[imgIdx]}
                        alt="image slide"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        draggable="false"
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 400 : -400 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction > 0 ? -400 : 400 }}
                        transition={{ 
                            x: { type:"spring", stiffness: 60, damping: 12 },
                            opacity: { duration: 0.7 }
                        }}
                        onAnimationComplete={handleAnimation}
                    />
                </AnimatePresence>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                    <button onClick={() => updateIdx(-1)}
                        className="text-md text-gray-600 opacity-70 hover:text-white">
                        <FaAngleLeft />
                    </button>
                    {img.map((_, i) => (
                        <span 
                            key={i}
                            onClick={() => {
                                setDirection(i > imgIdx ? 1 : -1);
                                setImgIdx(i);
                            }}
                            className={`inline-block w-2 h-2 mt-1 rounded-full cursor-pointer opacity-70 hover:bg-white
                                ${i === imgIdx ? "bg-white" : "bg-gray-600"}`}
                        />
                    ))}
                    <button onClick={() => updateIdx(1)}
                        className="text-md text-gray-600 opacity-70 hover:text-white">
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}