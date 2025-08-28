import { React, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import data from "../data/data.json";

const img = data.main.img;

export default function ImgSlide() {
    const [ imgIdx, setImgIdx ] = useState(0);
    const [ direction, setDirection ] = useState(0);
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
        timeoutRef.current = setInterval(() => {
            updateIdx(1);
        }, 4000);

        return () => clearInterval(timeoutRef.current);
    }, [img.length])

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
            className="w-full h-[250px] md:h-[600px] 2xl:h-[800px] md:flex justify-center items-center select-none"
            style={{ touchAction: "pan-y" }}
        >
            <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={img[imgIdx]}
                        src={img[imgIdx]}
                        alt="홈 이미지 슬라이드"
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
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2">
                    <button onClick={() => updateIdx(-1)}
                        className="text-xl md:text-2xl text-gray-500 hover:text-white">
                        <FaAngleLeft />
                    </button>
                    {img.map((_, i) => (
                        <span 
                            key={i}
                            onClick={() => {
                                setDirection(i > imgIdx ? 1 : -1);
                                setImgIdx(i);
                            }}
                            className={`inline-block w-2 md:w-4 h-2 md:h-4 mt-[6px] md:mt-1 rounded-full cursor-pointer hover:bg-white
                                ${i === imgIdx ? "bg-white" : "bg-gray-500"}`}
                        />
                    ))}
                    <button onClick={() => updateIdx(1)}
                        className="text-xl md:text-2xl text-gray-500 hover:text-white">
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}