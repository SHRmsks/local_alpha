import "@/app/global.css";
import Image from "next/image";
import logo from "@/../public/assets/login-page-logo.svg";

export default function LoginPage() {
    return (
        <div className="bg-iper-white w-full h-screen flex flex-col justify-center items-center">
            <div className="bg-white rounded-[40px] p-8 w-68 h-fit shadow-md flex flex-col justify-center items-center gap-4">
                <Image src={logo} alt="Iper Logo" className="size-10" />
                <h1 className="font-krub font-extrabold text-2xl">
                    Welcome to IPER
                </h1>
                <div className="w-full">
                    <p className="text-sm">EMAIL</p>
                    <input
                        type="text"
                        placeholder="xxxxx@email.com"
                        className="border-2 px-3 h-8 rounded-lg w-full bg-iper-white text-[10px]"
                    />
                </div>
                <div className="w-full">
                    <p className="text-sm">PASSWORD</p>
                    <input
                        type="text"
                        placeholder="Enter your password here"
                        className="border-2 px-3 h-8 rounded-lg w-full bg-iper-white text-[10px]"
                    />
                </div>
                <div className="flex justify-between items-center w-full">
                    <button className="text-[10px] text-[#707070]">
                        Forgot password?
                    </button>
                    <button className="bg-iper-blue w-20 py-2 rounded-lg text-iper-white text-[10px]">
                        Login
                    </button>
                </div>
                <div className="grid grid-cols-3 items-center">
                    <hr className="w-20 border-t border-iper-blue justify-self-start" />
                    <p className="text-xs text-iper-blue justify-self-center">
                        OR
                    </p>
                    <hr className="w-20 border-t border-iper-blue justify-self-end" />
                </div>
                <div className="flex justify-center items-center gap-6 w-full">
                    <button className="text-sm h-10 px-3 bg-iper-white rounded-lg border w-full">
                        <p>Google</p>
                    </button>
                    <button className="text-sm h-10 px-3 bg-iper-white rounded-lg border w-full">
                        <p>LinkedIn</p>
                    </button>
                </div>
                <div className="flex justify-center items-center gap-6 w-full">
                    <p className="text-[10px] text-[#707070]">
                        Don't have an account?
                    </p>
                    <button className="text-xs text-iper-blue font-semibold">
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    );
}
