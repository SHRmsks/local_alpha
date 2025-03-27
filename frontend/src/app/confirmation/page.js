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
      />
      <div className="p-8 w-80 md:w-96 lg:w-[448px] lg:h-[602px] h-fit flex flex-col justify-center items-center gap-4 lg:gap-6">
        <Image
          src={logo}
          alt="Iper Logo"
          className="size-10 md:size-14 lg:size-16 lg:mb-1"
        />
        <h1 className="font-krub font-extrabold text-2xl md:text-3xl lg:text-4xl">
          Your first milestone!
        </h1>
        <div className="flex justify-center items-center gap-6 w-full">
          <p className="text-[10px] md:text-lg text-[#707070]">
            Welcome to Iperuranium{name !== undefined ? ", "+name : ""}.
          </p>
        </div>
      </div>
    </div>
  );
}
