function Navbar() {
    return (
        <header className="bg-iper-blue w-full h-[68px] grid grid-cols-3 items-center">
            <div />
            <img
                src="/assets/primary-logo.png"
                alt="Primary Logo"
                className="justify-self-center w-[89px]"
            />
            <button className="justify-self-end w-[122px] mr-[36px] text-iper-white text-[13px]">
                Company Login
            </button>
        </header>
    );
}

export default Navbar;
