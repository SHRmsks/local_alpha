import Image from 'next/image'
import BackArrowIcon from '../../../public/assets/backArrow.svg'
import Pic from '../../../public/assets/pic.svg'
import CompaniesIcon from '../../../public/assets/companies.svg'
import NetworkIcon from '../../../public/assets/network.svg'
import SubscriptionIcon from '../../../public/assets/subscription.svg'
import PostsIcon from '../../../public/assets/posts.svg'
import BuyIcon from '../../../public/assets/buy.svg'
import MessagesIcon from '../../../public/assets/messages.svg'
import PenIcon from '../../../public/assets/pen.svg'
import SettingsIcon from '../../../public/assets/settings.svg'
import ContactIcon from '../../../public/assets/contact.svg'
import { useState } from 'react'
// Ignoring the fact that the image name and location need props for initial design
// Also ignoring that everything is secretly a link
export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <>
        <div className={`flex flex-col space-y-5 ${isCollapsed ? "invisible w-0" : "visible min-w-[160px]" }`}>
          <div className="bg-[#FFFEFA] flex flex-col items-center gap-2 rounded-lg shadow-md pt-5 pb-4 px-4">
              <button onClick={() => setIsCollapsed(curr => !curr)} className="ml-auto bg-gray-400 rounded-[25%]">
                <Image 
                  src={BackArrowIcon}
                  width={12}
                  height={28}
                  alt="Collapse Sidebar"
                />
              </button>
              <Image
                src={Pic}
                width={100}
                height={100}
                alt="Profile Picture"
                className="rounded-[50%]"
              />
            <p className="font-bold text-2xl">[Name]</p>
            <p>[LOCATION]</p>
            <button className="w-full rounded-lg border-[#0954A5] border-[1px] text-[#0954A5] text-center font-bold p-2">
              MY DASHBOARD
            </button>
            <a href="#" className="text-[#0954A5] text-[10px]">
              Profile
            </a>
          </div>

          <div
            id="follow"
            className="bg-[#FFFEFA] space-y-3 rounded-lg shadow-md px-3 py-5"
          >
            <p className="font-bold">FOLLOW</p>
            <div className="flex justify-between">
              <Image
                src={CompaniesIcon}
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
                src={NetworkIcon}
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
            className="bg-[#FFD154] space-y-3 rounded-lg shadow-md px-3 py-5"
          >
            <div className="flex">
              <Image
                src={SubscriptionIcon}
                width={20}
                height={20}
                alt="Subscription Icon"
              />
              <p className="font-bold ml-2">SUBSCRIPTION</p>
            </div>
            <button className="w-full bg-white text-center shadow-md rounded-[4px] p-2">
              <span className="text-[#9E7C1F]">BECOME A REAL IPER</span>
            </button>
          </div>

          <div
            id="options"
            className="bg-[#FFFEFA] space-y-3 rounded-lg shadow-md px-3 py-5"
          >
            <div className="flex">
              <Image
                src={PostsIcon}
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
                src={BuyIcon}
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
                src={MessagesIcon}
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
                src={PenIcon}
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
            className="bg-[#FFFEFA] space-y-3 rounded-lg shadow-md px-3 py-5"
          >
            <div className="flex">
              <Image
                src={SettingsIcon}
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
                src={ContactIcon}
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
        <div className={`${isCollapsed ? "visible mr-auto mt-10 " : "invisible w-0 h-0" }`}>
          <button onClick={() => setIsCollapsed(curr => !curr)} className="absolute left-0 lg:w-[124px] md:w-[100px] w-[75px] bg-[#FFFEFA] p-3 rounded-r-[8px] shadow-md">
            <Image
              src={Pic}
              width={100}
              height={100}
              alt="Profile Picture"
              className="rounded-[50%]"
            />
          </button>
        </div>
      </>
    );
}