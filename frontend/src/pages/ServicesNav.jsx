import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ServicesNav() {
    const location = useLocation();
    const isPerformance = location.pathname === "/services" || location.pathname === "/services/performance";
    const isShow = location.pathname === "/services/show";
    const classname = [
        "px-8 py-4 rounded-xl bg-[#fed455] text-lg text-gray-600 opacity-90 hover:opacity-80",
        "px-8 py-4 rounded-xl bg-[#2b77c9] text-lg text-gray-200 hover:text-gray-600 opacity-90 hover:bg-[#fed455]"
    ]

    return (
        <div className="flex gap-4">
            <Link to="/services/performance" 
                className={isPerformance ? classname[0] : classname[1]}
            >
                퍼포먼스
            </Link>
            <Link to="/services/show" 
                className={isPerformance ? classname[1] : isShow ? classname[0] : classname[1]}
            >
                무대 공연
            </Link>
            <Link to="/services/booth"
                className={isPerformance ? classname[1] : isShow ? classname[1] : classname[0]}
            >
                체험 부스
            </Link>
        </div>
    )
}