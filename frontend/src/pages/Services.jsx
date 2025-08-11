import React from "react";
import { Outlet } from 'react-router-dom'
import Nav from "./ServicesNav"
import data from "../data/data.json"

const img = data.service.img;

export default function Services() {
    return (
        <>
        <img src={img} className="w-full h-[600px] object-cover" />
        <div className="flex flex-col max-w-8xl mx-auto my-10 items-center text-center">
            <h1 className="text-5xl mb-8">
                <span className="text-[#2b77c9]">서</span>비스 소개
            </h1>
            <Nav />
            <hr className="w-full my-6 border-2 border-gray-600"/>
            <Outlet />
        </div>
        </>
    )
}