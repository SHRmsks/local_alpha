
import Image from 'next/image'

// Ignoring the fact that the image name and location need props for initial design
// Also ignoring that everything is secretly a link
export default function Sidebar() {
    return (
      <div className="flex flex-col space-y-5 w-[200px]">
        <div
          id="user"
          className="bg-[#FFFEFA] flex flex-col items-center gap-2 rounded-lg shadow-md pt-5 pb-4 pl-4 pr-4"
        >
          <Image
            src="/assets/pic.png"
            width={100}
            height={100}
            alt="Profile Picture"
            className="rounded-[50%]"
          />
          <p className="font-bold text-2xl">[Name]</p>
          <p>[LOCATION]</p>
          <button className="w-full rounded-lg border-[#0954A5] border-[1px] text-[#0954A5] font-bold p-2">
            MY DASHBOARD
          </button>
          <a href="#" className="text-[#0954A5] text-[10px]">
            Profile
          </a>
        </div>

        <div
          id="follow"
          className="bg-[#FFFEFA] space-y-3 rounded-lg shadow-md pt-5 pb-5 pl-3 pr-3"
        >
          <p className="font-bold">FOLLOW</p>
          <div className="flex justify-between">
            <Image
              src="/assets/companies.png"
              width={20}
              height={20}
              alt="Companies Icon"
            />
            <a href="#" className="ml-2">
              COMPANIES
            </a>
            <p className="ml-auto">35</p>
          </div>
          <div className="flex justify-between">
            <Image
              src="/assets/network.png"
              width={20}
              height={20}
              alt="Network Icon"
            />
            <a href="#" className="ml-2">
              NETWORK
            </a>
            <p className="ml-auto">123</p>
          </div>
        </div>

        <div
          id="sub"
          className="bg-[#FFD154] space-y-3 rounded-lg shadow-md pt-5 pb-5 pl-3 pr-3"
        >
          <div className="flex">
            <Image
              src="/assets/subscription.png"
              width={20}
              height={20}
              alt="Subscription Icon"
            />
            <p className="font-bold ml-2">SUBSCRIPTION</p>
          </div>
          <button className="w-full bg-white shadow-md rounded-[4px] p-2">
            <span className="text-[#9E7C1F]">BECOME A REAL IPER</span>
          </button>
        </div>

        <div
          id="options"
          className="bg-[#FFFEFA] space-y-3 rounded-lg shadow-md pt-5 pb-5 pl-3 pr-3"
        >
          <div className="flex">
            <Image
              src="/assets/posts.png"
              width={20}
              height={20}
              alt="Posts Icon"
            />
            <a href="#" className="ml-2">
              POSTS
            </a>
          </div>
          <div className="flex">
            <Image
              src="/assets/buy.png"
              width={20}
              height={20}
              alt="Buy Icon"
            />
            <a href="#" className="ml-2">
              BUY
            </a>
          </div>
          <div className="flex">
            <Image
              src="/assets/messages.png"
              width={20}
              height={20}
              alt="Messages Icon"
            />
            <a href="#" className="ml-2">
              MESSAGES
            </a>
          </div>
          <div className="flex">
            <Image
              src="/assets/pen.png"
              width={20}
              height={20}
              alt="Create Icon"
            />
            <a href="#" className="ml-2">
              CREATE
            </a>
          </div>
        </div>

        <div
          id="final"
          className="bg-[#FFFEFA] space-y-3 rounded-lg shadow-md pt-5 pb-5 pl-3 pr-3"
        >
          <div className="flex">
            <Image
              src="/assets/settings.png"
              width={20}
              height={20}
              alt="Settings Icon"
            />
            <a href="#" className="ml-2">
              SETTINGS
            </a>
          </div>
          <div className="flex">
            <Image
              src="/assets/contact.png"
              width={20}
              height={20}
              alt="Contact Icon"
            />
            <a href="#" className="ml-2">
              CONTACT US
            </a>
          </div>
          <button className="w-full rounded-[4px] border-[1px] border-[#E5484D] p-2 text-[#E5484D]">
            SIGN OUT
          </button>
          <a href="#" className="text-[#0954A5] text-[10px] text-center block">
            Company Login
          </a>
        </div>
      </div>
    );
}