import { React, useState, useEffect, useRef } from "react";
import { motion, useAnimation } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import data from "../data/data.json";

const cards = data.about.card;

export default function CardSlide() {
    const [ cardIdx, setCardIdx ] = useState(cards.length);
    const [ isAnimating, setIsAnimating ] = useState(false);
    const [ isJumping, setIsJumping ] = useState(false);
    const [ viewportWidth, setViewportWidth ] = useState(0);
    const timeoutRef = useRef(null);
    const viewportRef = useRef(null);
    const controls = useAnimation();

    const loopedCards = [...cards, ...cards, ...cards];
    const CARD_WIDTH = 250;
    const MD_CARD_WIDTH = 400;
    const CARD_GAP = 16;
    const CARD_FULL_WIDTH = CARD_WIDTH + CARD_GAP;

    const responsiveWidth = viewportWidth < 768
                            ? CARD_WIDTH
                            : MD_CARD_WIDTH;
    const responsiveFullWidth = responsiveWidth + CARD_GAP;

    const updateIdx = (newDir) => {
        if(isAnimating) return;

        setCardIdx((prevIdx) => ((prevIdx + newDir)));
        setIsAnimating(true);
    };

    useEffect (() => {
        if(viewportRef.current) {
            setViewportWidth(viewportRef.current.offsetWidth);
        }

        const handleResize = () => {
            if(viewportRef.current) {
                setViewportWidth(viewportRef.current.offsetWidth);
            }
        }
        window.addEventListener("resize", handleResize);

        timeoutRef.current = setInterval(() => {
            updateIdx(1);
        }, 4000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(timeoutRef.current);
        };
    }, [cards.length, viewportWidth]);

    const swipeHandler = useSwipeable({
        onSwipedLeft: () => updateIdx(1),
        onSwipedRight: () => updateIdx(-1),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    })

    const handleAnimation = async () => {
        setIsAnimating(false);
        let newIdx = cardIdx;

        if(cardIdx >= 2 * cards.length) {
            newIdx = cards.length;
        }else if(cardIdx < cards.length) {
            newIdx = 2 * cards.length - 1;
        }

        if(newIdx !== cardIdx) {
            setCardIdx(newIdx);
            setIsJumping(true);
        }
    }

    useEffect(() => {
        const targetX = `calc(${viewportWidth / 2}px - ${responsiveWidth / 2}px - ${cardIdx * responsiveFullWidth}px)`;

        if(isJumping) {
            controls.set({ x: targetX});
            setIsJumping(false);
        }else {
            controls.start({ x: targetX });
        }
        
    }, [cardIdx, controls, viewportWidth, isJumping])

    return (
        <div {...swipeHandler}
            className="w-full h-[340px] md:h-[540px] md:flex justify-center items-center select-none"
            style={{ touchAction: "pan-y" }}
        >
            <div ref={viewportRef} className="relative flex w-full h-full overflow-hidden">
                <button onClick={() => updateIdx(-1)}
                    className="absolute left-1 top-[150px] md:top-[225px] -translate-y-1/2 z-20 rounded-lg p-1 md:p-2
                    bg-gray-200 hover:bg-gray-500 bg-opacity-80 text-2xl md:text-4xl text-gray-500 hover:text-white">
                    <FaAngleLeft />
                </button>
                <motion.div
                    className="flex gap-x-4 absolute"
                    animate={controls}
                    transition={{ type: "spring", stiffness: 60, damping: 12 }}
                    onAnimationComplete={handleAnimation}
                >
                    {loopedCards.map((card, idx) => {
                        const distance = Math.abs(idx - cardIdx);
                        const isCenter = idx === cardIdx;
                        const cardStyle = {
                            scale: isCenter ? 1 : (distance === 1 ? 0.9 : 0.8),
                            opacity: isCenter ? 1 : (distance === 1 ? 0.7 : 0.5),
                            zIndex: isCenter ? 10 : (distance === 1 ? 5 : 1)
                        }

                        return (
                            <motion.div
                                key={idx}
                                className="w-[250px] md:w-[400px] h-[300px] md:h-[450px] p-1 bg-bcdeepblue text-gray-200 rounded-xl shadow-xl
                                flex justify-center items-center flex-shrink-0"
                                style={cardStyle}
                            >
                                <div className="w-[230px] md:w-[380px] h-[280px] md:h-[430px] rounded-lg border-[1.5px] border-gray-300
                                flex flex-col justify-center items-center text-center">
                                    <p className="text-xl md:text-4xl font-semibold absolute top-8 md:top-12">{card.title}</p>
                                    <div className="text-lg md:text-3xl mt-14">
                                        {card.content.map((content, contentIdx) => (
                                            <p key={`content-${contentIdx}`}>{content}</p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
                <button onClick={() => updateIdx(1)}
                    className="absolute right-1 top-[150px] md:top-[225px] -translate-y-1/2 z-20 rounded-lg p-1 md:p-2
                    bg-gray-200 hover:bg-gray-500 bg-opacity-80 text-2xl md:text-4xl text-gray-500 hover:text-white">
                    <FaAngleRight />
                </button>
            </div>
        </div>
    )
}