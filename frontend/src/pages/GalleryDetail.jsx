import { React, useState, useEffect } from "react";
import ImgModal from "../modal/ImgModal";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";

const img = [
    "/images/services/1.jpg",
    "/images/services/2.jpg",
    "/images/services/1.jpg",
    "/images/services/2.jpg",
    "/images/services/1.jpg",
    "/images/services/2.jpg",
    "/images/services/1.jpg",
    "/images/services/2.jpg",
    "/images/services/1.jpg",
    "/images/services/2.jpg"
]

export default function GalleryDetail() {
    const [ isActive, setActive ] = useState(false);
    const [ imgIdx, setImgIdx ] = useState(0);

    const updateIdx = (newDir) => {        
        setImgIdx((prevIdx) => (
            (prevIdx + newDir + img.length) % img.length
        ));
    };

    const swipeHandler = useSwipeable({
        onSwipedLeft: () => updateIdx(1),
        onSwipedRight: () => updateIdx(-1),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    })

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key === "Escape") {
                setActive(false);
            }else if(e.key === "ArrowLeft") {
                updateIdx(-1);
            }else if(e.key === "ArrowRight") {
                updateIdx(1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
        <div className="flex flex-col mx-40 my-10">
            <h1 className="text-5xl mb-6">장소 행사명</h1>
            <p className="text-2xl mb-6">20xx-xx</p>
            <hr className="mb-10 border-gray-500"/>
            <div className="mb-10">
                <div className="flex flex-wrap items-center gap-8">
                    {img.map((i, idx) => (
                        <div key={idx}>
                            <img src={i} onClick={() => { setImgIdx(idx), setActive(true) }}
                                className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] object-cover rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center my-10">
                <Link to="/gallery" className="px-8 py-4 rounded-xl bg-[#fed455] text-lg text-gray-600 opacity-90 hover:opacity-80">
                    목록
                </Link>
            </div>
        </div>
        { isActive && (
            <ImgModal swipeHandler={swipeHandler} filename={img[imgIdx]} 
            setActive={setActive} updateIdx={updateIdx} />
        )}
        </>
    )
}