import React from "react";
import { Outlet } from 'react-router-dom'
import Nav from "./ServicesNav"
import data from "../data/data.json"

const img = data.service.img;

export default function Services() {
    return (
        <>
        <img src={img} className="w-full h-[400px] object-cover" />
        <div className="flex flex-col mx-40 my-10 items-center text-center">
            <h1 className="text-5xl mb-8">
                <span className="text-[#2b77c9]">서</span>비스 소개
            </h1>
            <Nav />
            <Outlet />
        </div>
        </>
    )
}