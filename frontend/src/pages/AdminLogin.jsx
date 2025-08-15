import { React, useEffect } from "react";
import { useLoginAPI } from "../hooks/useLoginAPI";
import LoadingSpinner from "./LodaingSpinner";

export default function Login({ setIsLogin }) {
    const { handleFormChange, handleLogin, formData, isLoginLoading, loginError } = useLoginAPI();

    const onSubmit = (e) => {
        handleLogin(e, setIsLogin);
        // handleJoin(e);
    }

    return (
        <div className="flex flex-col max-w-[400px] md:max-w-8xl mx-auto my-44 items-center text-center">
            <div className="w-full md:w-1/2 p-2 bg-bcdeepblue rounded-3xl shadow-xl text-gray-200">
                <div className="p-8 md:p-14 border border-gray-400 rounded-2xl">
                    <h1 className="text-4xl md:text-5xl mb-16">관리자 로그인</h1>
                    <form id="login-form" onSubmit={onSubmit}>
                        <div className="text-xl md:text-3xl mb-4">
                            <label htmlFor="inputId" className="mr-10">ID</label>
                            <input type="text" name="inputId" id="inputId" onChange={handleFormChange}
                                value={formData.inputId} className="w-50 md:w-72 p-1 mr-8 text-bcdeepblue rounded-md" />
                        </div>
                        <div className="text-xl md:text-3xl mb-4">
                            <label htmlFor="inputPw" className="mr-6">PW</label>
                            <input type="password" name="inputPw" id="inputPw" onChange={handleFormChange}
                                value={formData.inputPw} className="w-50 md:w-72 p-1 mr-8 text-bcdeepblue rounded-md" />
                        </div>
                        <div className="mt-4 text-xl text-center">
                            {isLoginLoading && (
                                <LoadingSpinner className="text-bcblue" />
                            )}
                            {loginError && (
                                <p className="text-[#fb4140]">{loginError}</p>
                            )}
                        </div>
                        <div className="text-xl md:text-2xl mt-8 md:mt-16">
                            <button type="submit" form="login-form" disabled={isLoginLoading} className="p-1 py-3 md:py-4 rounded-2xl shadow-lg 
                            bg-bclightblue text-gray-200 hover:text-gray-600 hover:bg-bcyellow transition-colors duration-300">
                                <span className="px-3 py-2 md:px-6 md:py-3 border border-white rounded-xl">
                                    로그인
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}