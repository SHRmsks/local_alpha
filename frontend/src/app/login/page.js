"use client";

import "@/app/global.css";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@/../public/assets/login-page-logo.svg";
import logoGoogle from "@/../public/assets/logo-google.svg";
import logoLinkedin from "@/../public/assets/logo-linkedin.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { v4 as uuidv4 } from "uuid";

export default function Login() {
  const router = useRouter();
  // fetching the oauth
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "redirect",
    redirect_uri: "http://localhost:5050/callback",
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const linkedInLogin = () => {
    const uuid = uuidv4();
    const clientId = "77nme6nzlhmnlv";
    const scope = "openid profile email";
    const redirectUri = "http://localhost:5050/linkedin/callback";
    window.location.href = encodeURI(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${uuid}`
    );
  };

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [signup, setSignup] = useState(false);
  const signupHandler = () => {
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
    const jsonfiedSignupVal = JSON.stringify({
      userName: nameValue.toString().trim(),
      password: passwordValue.toString().trim(),
      email: emailValue.toString().trim(),
    });
    fetch("http://localhost:5050/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonfiedSignupVal,
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Connection error");
        }
        return res.json();
      })
      .then((json) => {
        if (json.message === "Successful") {
          if (signup === true) {
          }
        } else {
          console.log("user is existed");
        }
        setSignup(false);
        router.push("/login");
        return;
      })
      .catch((err) => console.error(err));
  };

  const submitHandler = () => {
    setNameValue("");
    setEmailValue("");
    setPasswordValue("");
    const jsonfiedLoginVal = JSON.stringify({
      userName: emailValue.toString().trim(),
      password: passwordValue.toString().trim(),
    });
    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonfiedLoginVal,
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network Lost");
        }
        return res.json();
      })
      .then((json) => {
        if (json.message === "Login Successful") {
          const uuid = json.uuid;
          console.log("uuid1", uuid);
          router.push(`/dashboard?session=${uuid}`);
        }
      })
      .catch((err) => {
        console.error(err);
        setSignup(true);
      });
  };

  return (
    <div className="bg-iper-white w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-[40px] p-8 w-80 md:w-96 lg:w-[448px] lg:h-[602px] h-fit shadow-md flex flex-col justify-center items-center gap-4 lg:gap-6">
        <Image
          src={logo}
          alt="Iper Logo"
          className="size-10 md:size-14 lg:size-16 lg:mb-1"
        />
        <h1 className="font-krub font-extrabold text-2xl md:text-3xl lg:text-4xl">
          {signup ? "New to IPER?" : "Welcome to IPER"}
        </h1>
        {signup && (
          <div className="w-full flex flex-col gap-1">
            <p className="text-sm">NAME</p>
            <input
              value={nameValue}
              onChange={(evt) => setNameValue(evt.target.value)}
              type="text"
              placeholder="[First Name] [Last Name]"
              className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs "
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-1">
          <p className="text-sm">EMAIL</p>
          <input
            value={emailValue}
            onChange={(evt) => setEmailValue(evt.target.value)}
            type="text"
            placeholder="xxxxx@email.com"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs "
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <p className="text-sm">PASSWORD</p>
          <input
            value={passwordValue}
            onChange={(evt) => setPasswordValue(evt.target.value)}
            type="password"
            placeholder="Enter your password here"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <button
            className="text-[10px] md:text-xs text-[#707070] hover:underline"
            style={{ visibility: signup ? "hidden" : "visible" }}
          >
            Forgot password?
          </button>
          <button
            onClick={
              signup ? signupHandler /*placeholder for signup*/ : submitHandler
            }
            className="bg-iper-blue w-20 md:w-24 py-2 md:py-2.5 rounded-lg text-iper-white text-[10px] md:text-xs transition hover:bg-iper-gold"
          >
            Login
          </button>
        </div>

        {!signup && (
          <>
            <div className="grid grid-cols-3 items-center my-[-6px]">
              <hr className="w-28 md:w-32 lg:w-40 border-t border-iper-blue justify-self-start" />
              <p className="text-xs md:text-sm text-iper-blue justify-self-center">
                OR
              </p>
              <hr className="w-28 md:w-32 lg:w-40 border-t border-iper-blue justify-self-end" />
            </div>

            <div className="flex justify-center items-center gap-6 w-full">
              <button
                onClick={googleLogin}
                className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] h-9 md:h-10 px-3 bg-iper-white rounded-md border w-full transition hover:scale-[1.05]"
              >
                <Image
                  src={logoGoogle}
                  alt="Google Logo"
                  className="size-4 md:size-5"
                />
                <p>Google</p>
              </button>
              <button
                onClick={linkedInLogin}
                className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] h-9 md:h-10 px-3 bg-iper-white rounded-md border w-full transition hover:scale-[1.05]"
              >
                <Image
                  src={logoLinkedin}
                  alt="LinkedIn Logo"
                  className="size-4 md:size-5"
                />
                <p>LinkedIn</p>
              </button>
            </div>
          </>
        )}

        <div className="flex justify-center items-center gap-6 w-full">
          <p className="text-[10px] md:text-xs text-[#707070]">
            {signup ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            onClick={() => setSignup(!signup)}
            className="text-xs md:text-sm text-iper-blue font-semibold transition hover:text-iper-gold"
          >
            {signup ? "LOGIN" : "SIGN UP"}
          </button>
        </div>
      </div>
    </div>
  );
}
