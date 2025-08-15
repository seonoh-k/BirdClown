import { useState } from "react";

export function useLoginAPI() {
    const initialData = { inputId: "", inputPw: "" };
    const [ formData, setFormData ] = useState(initialData);
    const [ isLoginLoading, setLoginLoading ] = useState(false);
    const [ loginError, setLoginError ] = useState(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleJoin = async (e) => {
        e.preventDefault();

        const request = new URLSearchParams();
        request.append("username", formData.inputId);
        request.append("password", formData.inputPw);

        try {
            const res = await fetch("/api/auth/join", {
                method: "POST",
                body: request
            })

            if(res.ok) console.log("회원가입 성공");
        }catch(err) {
            setLoginError(err.message);
        }
    }

    const handleLogin = async (e, setIsLogin) => {
        e.preventDefault();
        
        setLoginLoading(true);
        setLoginError(null);

        try {
            const request = new URLSearchParams();
            request.append("username", formData.inputId);
            request.append("password", formData.inputPw);

            const res = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded"
                },
                body: request
            });

            const result = await res.json();
            if(result.data && result.data.username === formData.inputId) {
                sessionStorage.setItem("username", formData.inputId);
                sessionStorage.setItem("role", result.data.authorities[0].authority);
            }else {
                throw new Error(result.message);
            }
            
            setIsLogin(true);
        } catch(err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
            handleCancle();
        }
    }

    const handleLogout = async (setIsLogin) => {
        const res = await fetch("/api/auth/logout", {
            method: "POST"
        })

        const result = await res.json();

        if(!res.ok) throw new Error(result.message);

        setIsLogin(false);
        sessionStorage.clear();
    }

    const handleCancle = () => {
        setFormData(initialData);
    }

    return {
        formData, isLoginLoading, loginError,
        handleFormChange, handleLogin, handleJoin, handleLogout, handleCancle
    }
}