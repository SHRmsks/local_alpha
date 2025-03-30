"use client";

import "@/app/globals.css";
import Image from "next/image";
import logo from "@/../public/assets/login-page-logo.svg";
import Confetti from 'react-confetti';
import {useEffect, useState} from 'react';

export default function Confirmation({ name }) {
  const [size, setSize] = useState({width:0, height:0});

  useEffect(() => {
    if (typeof window != "undefined") {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }, [])

  return (
    <div className="bg-iper-white w-full h-screen flex flex-col justify-center items-center">
      <Confetti
        width={size.width}
        height={size.height}
        colors={["#124A9D", "#F5DE87", "#F0D077", "#A6D8EB"]}
        numberOfPieces={500}
        recycle={false}
      />
      <div className="w-fit lg:h-[602px] h-fit flex flex-col justify-center items-center gap-4 lg:gap-6 font-krub">
        <Image
          src={logo}
          alt="Iper Logo"
          className="size-16 md:size-20 lg:size-24 lg:mb-1"
        />
        <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
          Your first milestone!
        </h1>
        <div className="flex justify-center items-center gap-6 w-full">
          <p className="text-xl md:text-2xl lg:text-3xl">
            Welcome to IPER{name !== undefined ? ", "+name : ""}.
          </p>
        </div>
        <p className="text-iper-blue text-lg md:text-xl lg:text-2xl mt-8">
          Get started -&gt;
        </p>
      </div>
    </div>
  );
}
