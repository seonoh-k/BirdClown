import React from "react";

export default function Login() {
    return (
        <div className="flex flex-col max-w-[400px] md:max-w-8xl mx-auto my-44 items-center text-center">
            <div className="w-full md:w-1/2 p-2 bg-bcdeepblue rounded-3xl shadow-xl text-gray-200">
                <div className="p-8 md:p-14 border border-gray-400 rounded-2xl">
                    <h1 className="text-4xl md:text-5xl mb-16">관리자 로그인</h1>
                    <form id="loginForm">
                        <div className="text-xl md:text-3xl mb-4">
                            <label className="mr-10">ID</label>
                            <input type="text" name="id" id="id" className="w-50 md:w-72 p-1 mr-8 rounded-md" />
                        </div>
                        <div className="text-xl md:text-3xl mb-4">
                            <label className="mr-6">PW</label>
                            <input type="password" name="password" id="password" className="w-50 md:w-72 p-1 mr-8 rounded-md" />
                        </div>
                        <div className="text-xl md:text-2xl mt-8 md:mt-16">
                            <button type="submit" className="p-1 py-3 md:py-4 rounded-2xl shadow-lg bg-bclightblue text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                                <span className="px-3 py-2 md:px-6 md:py-3 border border-white rounded-xl">로그인</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}