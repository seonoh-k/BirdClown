import React from "react";
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ isAllowed, redirectPath = "/admin" }) {
    if(!isAllowed) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet /> 
}