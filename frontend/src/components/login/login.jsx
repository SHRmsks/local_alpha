import "@/app/global.css";
import Image from "next/image";
import logo from "@/../public/assets/login-page-logo.svg";
import logoGoogle from "@/../public/assets/logo-google.svg";
import logoLinkedin from "@/../public/assets/logo-linkedin.svg";

export default function LoginPage() {
    return (
        <div className="bg-iper-white w-full h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-[40px] p-8 md:p-10 w-80 md:w-96 h-fit shadow-md flex flex-col justify-center items-center gap-4">
                <Image
                    src={logo}
                    alt="Iper Logo"
                    className="size-10 md:size-14"
                />
                <h1 className="font-krub font-extrabold text-2xl md:text-3xl">
                    Welcome to IPER
                </h1>
                <div className="w-full flex flex-col gap-1">
                    <p className="text-sm md:text-base">EMAIL</p>
                    <input
                        type="text"
                        placeholder="xxxxx@email.com"
                        className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <p className="text-sm md:text-base">PASSWORD</p>
                    <input
                        type="text"
                        placeholder="Enter your password here"
                        className="border-2 px-3 h-8 md:h-9 rounded-lg w-full bg-iper-white text-[10px] md:text-xs"
                    />
                </div>
                <div className="flex justify-between items-center w-full">
                    <button className="text-[10px] md:text-xs text-[#707070]">
                        Forgot password?
                    </button>
                    <button className="bg-iper-blue w-20 md:w-24 py-2 md:py-2.5 rounded-lg text-iper-white text-[10px] md:text-xs">
                        Login
                    </button>
                </div>
                <div className="grid grid-cols-3 items-center my-[-6px]">
                    <hr className="w-28 md:w-32 border-t border-iper-blue justify-self-start" />
                    <p className="text-xs md:text-sm text-iper-blue justify-self-center">
                        OR
                    </p>
                    <hr className="w-28 md:w-32 border-t border-iper-blue justify-self-end" />
                </div>
                <div className="flex justify-center items-center gap-6 w-full">
                    <button className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] h-9 md:h-10 px-3 bg-iper-white rounded-md border w-full">
                        <Image
                            src={logoGoogle}
                            alt="Google Logo"
                            className="size-4 md:size-5"
                        />
                        <p>Google</p>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] h-9 md:h-10 px-3 bg-iper-white rounded-md border w-full">
                        <Image
                            src={logoLinkedin}
                            alt="LinkedIn Logo"
                            className="size-4 md:size-5"
                        />
                        <p>LinkedIn</p>
                    </button>
                </div>
                <div className="flex justify-center items-center gap-6 w-full">
                    <p className="text-[10px] md:text-xs text-[#707070]">
                        Don't have an account?
                    </p>
                    <button className="text-xs md:text-sm text-iper-blue font-semibold">
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );
}
