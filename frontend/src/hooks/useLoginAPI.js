import { useState } from "react";

export function useLoginAPI() {
    const initialData = { inputId: "", inputPw: "" };
    const [ formData, setFormData ] = useState(initialData);
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isLoginLoading, setLoginLoading ] = useState(false);
    const [ loginError, setLoginError ] = useState(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e, navigate) => {
        e.preventDefault();
        
        setLoginLoading(true);
        setLoginError(null);

        try {
            const request = new FormData();
            request.append("id", formData.inputId);
            request.append("pw", formData.inputPw);

            const res = await fetch(`/api/login`, {
                method: "POST",
                body: request
            });

            const result = await res.json();
            if(result.data.id === undefined) {
                throw new Error("아이디가 일치하지 않습니다");
            }else if(result.data.id === null) {
                throw new Error("비밀번호가 일치하지 않습니다");
            }else if(result.data.id === formData.inputId) {
                sessionStorage.setItem("user_id", formData.inputId);
                sessionStorage.setItem("name", result.data.name);
            }
            
            setIsLogin(true);
            navigate("/admin/gallery");
        } catch(err) {
            setLoginError(err.message);
        } finally {
            setLoginLoading(false);
            handleCancle();
        }
    }

    const handleLogout = (navigate) => {
        setIsLogin(false);
        sessionStorage.clear();
        navigate("/");
    }

    const handleCancle = () => {
        setFormData(initialData);
    }

    return {
        formData, isLogin, setIsLogin, isLoginLoading, loginError,
        handleFormChange, handleLogin, handleLogout, handleCancle
    }
}