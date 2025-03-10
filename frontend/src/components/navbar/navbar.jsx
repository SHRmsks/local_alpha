import Image from "next/image";
import logo from "@/../public/assets/primary-logo.png";

function Navbar() {
    return (
        <header className="bg-iper-blue w-full h-fit p-6 grid grid-cols-3 items-center">
            <div />
            <Image
                src={logo}
                alt="Primary Logo"
                className="justify-self-center w-[100px]"
            />
            <button className="justify-self-end w-[122px] mr-[36px] text-iper-white text-[13px]">
                Company Login
            </button>
        </header>
    );
}

export default Navbar;
