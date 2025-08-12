import React from "react";

export default function Login() {
    return (
        <div className="flex flex-col max-w-8xl mx-auto my-44 items-center text-center">
            <div className="w-1/2 p-2 bg-bcdeepblue rounded-3xl shadow-xl text-gray-200">
                <div className="p-14 border border-gray-400 rounded-2xl">
                    <h1 className="text-5xl mb-16">관리자 로그인</h1>
                    <form id="loginForm">
                        <div className="text-3xl mb-4">
                            <label className="mr-10">ID</label>
                            <input type="text" name="id" id="id" className="w-72 p-1 mr-8 rounded-md" />
                        </div>
                        <div className="text-3xl mb-4">
                            <label className="mr-6">PW</label>
                            <input type="password" name="password" id="password" className="w-72 p-1 mr-8 rounded-md" />
                        </div>
                        <div className="text-2xl mt-16">
                            <button type="submit" className="px-8 py-4 bg-bclightblue hover:opacity-80 rounded-xl shadow-lg">
                                로그인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}