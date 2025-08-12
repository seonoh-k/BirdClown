import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ServicesNav() {
    const location = useLocation();
    const isPerformance = location.pathname === "/services" || location.pathname === "/services/performance";
    const isShow = location.pathname === "/services/show";
    const classname = [
        "p-1 py-6 rounded-xl bg-bcyellow text-2xl text-gray-600",
        "p-1 py-6 rounded-xl bg-bclightblue text-2xl text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300"
    ]

    return (
        <div className="flex items-center gap-4">
            <div className={isPerformance ? classname[0] : classname[1]}>
                <Link to="/services/performance" 
                    className="px-9 py-5 border border-white rounded-lg"
                >
                    퍼포먼스
                </Link>
            </div>
            <div className={isPerformance ? classname[1] : isShow ? classname[0] : classname[1]}>
                <Link to="/services/show" 
                    className="px-9 py-5 border border-white rounded-lg"
                >
                    무대 공연
                </Link>
            </div>
            <div className={isPerformance ? classname[1] : isShow ? classname[1] : classname[0]}>
                <Link to="/services/booth"
                    className="px-9 py-5 border border-white rounded-lg"
                >
                    체험 부스
                </Link>
            </div>
        </div>
    )
}