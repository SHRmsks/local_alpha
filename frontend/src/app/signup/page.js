"use client";

import "@/app/global.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@/../public/assets/login-page-logo.svg";

export default function Signup() {
  const router = useRouter();

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-iper-white w-full h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-[40px] p-8 w-80 md:w-96 lg:w-[448px] lg:h-[602px] h-fit shadow-md flex flex-col justify-center items-center gap-4 lg:gap-6">
        <Image
          src={logo}
          alt="Iper Logo"
          className="size-10 md:size-14 lg:size-16 lg:mb-1"
        />
        <h1 className="font-krub font-extrabold text-2xl md:text-3xl lg:text-4xl">
          New to IPER?
        </h1>
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
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password here"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
          />
          <input
            value={confirmValue}
            onChange={(evt) => setConfirmValue(evt.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
          />
          <p 
            onClick={() => setShowPassword(!showPassword)}
            className="text-[10px] md:text-xs text-[#707070] hover:underline hover:cursor-pointer"
          >{showPassword ? "Hide password" : "Show password"}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <button
            className="text-[10px] md:text-xs text-[#707070] hover:underline"
            style={{ visibility: "hidden" }}
          >
            Forgot password?
          </button>
          <button
            onClick={() => {}}
            className="bg-iper-blue w-20 md:w-24 py-2 md:py-2.5 rounded-lg text-iper-white text-[10px] md:text-xs transition hover:bg-iper-gold"
          >
            Sign Up
          </button>
        </div>

        <div className="flex justify-center items-center gap-6 w-full">
          <p className="text-[10px] md:text-xs text-[#707070]">
            Already have an account?
          </p>
          <button
            onClick={() => router.push('/login')}
            className="text-xs md:text-sm text-iper-blue font-semibold transition hover:text-iper-gold"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}