"use client";
import React, { useEffect } from "react";
import LoginPage from "@/components/login/login";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import "@/app/global.css";
import Navbar from "@/components/navbar/navbar";
const GoogleloginButton = () => {
    const login = useGoogleLogin({
        flow: "auth-code",
        ux_mode: "redirect",
        redirect_uri: "http://localhost:5050/callback",
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    });
    return <button onClick={login}>Sign in with Google 🚀</button>;
};
export default function Login() {
    useEffect(() => {
        // const outcome = fetch("http://localhost:5050/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ UserName: "John", password: "123456" }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data))
        //   .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <GoogleOAuthProvider clientId="70931151165-akujq6qnfukkn66heiuj51lfju7lvnod.apps.googleusercontent.com">
                <GoogleloginButton />
            </GoogleOAuthProvider>
            <LoginPage />
        </div>
    );
}
