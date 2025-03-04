"use client";
import React, { useEffect } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";

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

const LinkedInButton =()=> {
    const { linkedInLogin } = useLinkedIn({
      clientId: "77nme6nzlhmnlv",
      scope: "r_liteprofile r_emailaddress",
      redirectUri: "http://localhost:5050/linkedin/callback",
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.error(err);
      },
    });
    return <div onClick={linkedInLogin}>

    login with LinkedIn
    </div>
}
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
      
      <LinkedInButton/>
    </div>
  );
}
