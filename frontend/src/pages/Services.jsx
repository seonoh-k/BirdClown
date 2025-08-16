import React from "react";
import { Outlet } from 'react-router-dom'
import Nav from "./ServicesNav"
import data from "../data/data.json"

const img = data.service.img;

export default function Services() {
    return (
        <>
        <img src={img} className="w-full h-[180px] md:h-[300px] 2xl:h-[400px] object-cover" />
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