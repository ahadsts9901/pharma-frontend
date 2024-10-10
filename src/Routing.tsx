import "./App.css"
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/user";
import axios from "axios";
import { baseUrl } from "./utils/core";
import SplashScreen from "./pages/splash-screen/SplashScreen";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import SingleProduct from "./pages/single-product/SingleProduct";
import { Navigate, Route, Routes } from "react-router-dom";

const UnAuthRouting = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
    )
}

const AuthRouting = () => {
    return (
        <>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/product/:productId" element={<SingleProduct />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
        </>
    )
}

const Routing = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector((state: any) => state?.user)

    useEffect(() => {
        checkLoginStatus()
    }, [])

    const checkLoginStatus = async () => {
        try {
            const resp = await axios.get(`${baseUrl}/api/v1/profile`, { withCredentials: true })
            if (currentUser?.isActive) {
                await axios.put(`${baseUrl}/api/v1/mark-messages-delievered`, {}, {
                    withCredentials: true
                })
            }
            dispatch(login(resp?.data?.data))
        } catch (error) {
            console.error(error)
            dispatch(logout())
        }
    }

    return (
        <>
            {currentUser?.isLogin == null ? <SplashScreen loader={true} /> : null}
            {currentUser?.isLogin == false ? <UnAuthRouting /> : null}
            {currentUser?.isLogin == true ? <AuthRouting /> : null}
        </>
    )
}

export default Routing
