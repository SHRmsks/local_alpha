"use client";

import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "@/../public/assets/login-page-logo.svg";

export default function Signup() {
  const router = useRouter();

  const [firstValue, setFirstValue] = useState("");
  const [lastValue, setLastValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [legitPsswrd, setLegitPsswrd] = useState(true);
  const [legitRepeat, setlegitRepeat] = useState(true);

  const checkPassword = () => {
    if (passwordValue !== "") {
      if (
        passwordValue.length < 6 ||
        passwordValue.length > 30 ||
        !/[a-z]/.test(passwordValue) ||
        !/[A-Z]/.test(passwordValue)
      ) {
        setLegitPsswrd(false);
      } else {
        setLegitPsswrd(true);
      }
    } else {
      setLegitPsswrd(true);
    }
    if (passwordValue !== "" && confirmValue !== "") {
      if (passwordValue !== confirmValue) {
        setlegitRepeat(false);
      } else {
        setlegitRepeat(true);
      }
    } else {
      setlegitRepeat(true);
    }
  };
  const signupHandler = () => {
    setFirstValue("");
    setLastValue("");
    setEmailValue("");
    setPasswordValue("");
    setConfirmValue("");
    const jsonfiedSignupVal = JSON.stringify({
      userName: (firstValue.toString()+" "+lastValue.toString()).trim(),
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
        if (json.message !== "Successful") {
          console.log("user is existed");
        }
        router.push({ pathname: "/confirmation", query: {name: firstValue}}, '/confirmation');
        return;
      })
      .catch((err) => console.error(err));
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
          New to IPER?
        </h1>
        <div className="w-full flex flex-row gap-1">
          <div className="flex-col w-full">
            <p className="text-sm">NAME</p>
            <input
            value={firstValue}
            onChange={(evt) => setFirstValue(evt.target.value)}
            type="text"
            placeholder="First Name"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs "
            />
          </div>
          <div className="flex-col w-full">
            <p className="text-sm">​</p>
            <input
            value={lastValue}
            onChange={(evt) => setLastValue(evt.target.value)}
            type="text"
            placeholder="Last Name"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs "
            />
          </div>
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
          <div className="w-full flex-row gap-[5px] items-center justify-start">
            <p className="text-sm">PASSWORD</p>
            {legitPsswrd && legitRepeat ? null : legitPsswrd ? (
              legitRepeat ? null : (
                <p className="text-[#FF4949] text-[10px]">
                  Password does not match
                </p>
              )
            ) : (
              <p className="text-[#FF4949] text-[10px] break-words text-pretty">
                Password must be longer than 6 characters and less than 30 characters
                with at least one uppercase and lowercase{" "}
              </p>
            )}
          </div>
          <input
            value={passwordValue}
            onBlur={checkPassword}
            onChange={(evt) => setPasswordValue(evt.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password here"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
          />
          <input
            value={confirmValue}
            onBlur={checkPassword}
            onChange={(evt) => setConfirmValue(evt.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
          />
          <p
            onClick={() => setShowPassword(!showPassword)}
            className="text-[10px] md:text-xs text-[#707070] hover:underline hover:cursor-pointer"
          >
            {showPassword ? "Hide password" : "Show password"}
          </p>
        </div>
        <div className="flex justify-center items-center w-full">
          <button
            disabled={
              !legitPsswrd ||
              !legitRepeat ||
              passwordValue === "" ||
              confirmValue === "" || 
              firstValue === ""||
              lastValue === "" ||
              emailValue===""
            }
            onClick={signupHandler}
            className=" bg-iper-blue w-20 md:w-24 py-2 md:py-2.5 rounded-lg text-iper-white text-[10px] md:text-xs transition hover:bg-iper-gold disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-iper-blue"
          >
            Sign Up
          </button>
        </div>

        <div className="flex justify-center items-center gap-6 w-full">
          <p className="text-[10px] md:text-xs text-[#707070]">
            Already have an account?
          </p>
          <button
            onClick={() => router.push("/login")}
            className="text-xs md:text-sm text-iper-blue font-semibold transition hover:text-iper-gold"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
