"use client";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import "@/app/global.css";
const GoogleloginButton = () => {
    const login = useGoogleLogin({
        flow: "auth-code",
        ux_mode: "redirect",
        redirect_uri: "http://localhost:5050/callback",
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    });
    return <button onClick={login}>Sign in with Google 🚀</button>;
};

const LinkedInButton = () => {
    const redirect = () => {
        const uuid = uuidv4();
        const clientId = "77nme6nzlhmnlv";
        const scope = "openid profile email";
        const redirectUri = "http://localhost:5050/linkedin/callback";
        window.location.href = encodeURI(
            `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${uuid}`
        );
    };

    return <button onClick={redirect}>login with LinkedIn</button>;
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

            <LinkedInButton />
        </div>
    );
}
