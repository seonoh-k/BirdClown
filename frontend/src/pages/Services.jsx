import React from "react";
import { Outlet } from 'react-router-dom'
import Nav from "./ServicesNav"
import data from "../data/data.json"

const img = data.service.img;

export default function Services() {
    return (
        <>
        <title>서비스 소개 | 버드클라운</title>
        <meta name="description" content="유쾌한 광대 공연부터 화려한 퍼레이드, 키다리, 마술, 풍선 아트까지. 고객님의 행사를 최고로
            만들어 줄 버드클라운의 특별한 서비스들을 만나보세요." />
        <meta property="og:type" content="article" /> 
        <meta property="og:title" content="서비스 소개 | 버드클라운" />
        <meta property="og:description" content="유쾌한 광대 공연부터 화려한 퍼레이드, 키다리, 마술, 풍선 아트까지. 고객님의 행사를 최고로
            만들어 줄 버드클라운의 특별한 서비스들을 만나보세요." />
        <meta property="og:image" content="https://birdclown.kr/BIRDCLOWN3.png" />
        <meta property="og:url" content="https://birdclown.kr/services" />
        <img src={img} alt="서비스 소개 배너" className="w-full h-[180px] md:h-[300px] 2xl:h-[500px] object-cover" />
        <div className="flex flex-col max-w-[360px] md:max-w-5xl 2xl:max-w-8xl mx-auto my-10 md:my-20 items-center text-center">
            <h1 className="text-2xl md:text-4xl 2xl:text-5xl mb-8">
                <span className="text-3xl md:text-5xl 2xl:text-6xl text-bcblue">서</span>비스 소개
            </h1>
            <Nav />
            <hr className="w-full mb-6 border md:border-2 border-gray-600"/>
            <Outlet />
        </div>
        </>
    )
}