import React from "react";

export default function Login() {
    return (
        <div className="flex flex-col mx-40 my-10 items-center text-center">
            <div className="w-1/2 mt-4 py-16 bg-[#2b77c9] rounded-2xl shadow-xl text-gray-200">
                <h1 className="text-5xl mb-16">관리자 로그인</h1>
                <form id="loginForm">
                    <div className="text-3xl mb-4">
                        <label className="mr-10">ID</label>
                        <input type="text" name="id" id="id" className="p-1 rounded-md" />
                    </div>
                    <div className="text-3xl mb-4">
                        <label className="mr-6">PW</label>
                        <input type="password" name="password" id="password" className="p-1 rounded-md" />
                    </div>
                    <div className="text-2xl mt-16">
                        <button type="submit" className="px-8 py-4 bg-[#5592d3] hover:opacity-80 rounded-xl shadow-lg">
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}