import Image from 'next/image'
import CompanyLg from '../../../public/assets/companyLg.svg'
import ProductInfoIcon from '../../../public/assets/productInfo.svg'
import ProgressIcon from '../../../public/assets/progress.svg'
import MarketIcon from '../../../public/assets/market.svg'
import MoneyIcon from '../../../public/assets/money.svg'
import InfinityIcon from '../../../public/assets/infinity.svg'
import PhoneIcon from '../../../public/assets/Phone.svg'
import EmailIcon from '../../../public/assets/email.svg'

export default function CompanyProf() {
    return (
        <div className="rounded-lg shadow-md bg-[#FFFEFA] w-[70%]">

            <div className="flex flex-col rounded-lg bg-no-repeat bg-cover bg-top gap-3 p-8" style={{ backgroundImage: `url('${CompanyLg.src}')`, backgroundSize: "auto 110px" }}>
                <div className="flex mt-6">
                    <Image src={'/assets/profileImg.png'} width={120} height={120} alt="Company Profile Picture" className="rounded-[50%]" />
                    <div className="mt-[60px] ml-2">
                        <p className="text-2xl">Company Name</p>
                        <p className="text-[#6E6E6E]">Description and short bio about the company</p>
                    </div>
                </div>
                <div className="flex space-x-5">
                    <span className="text-[#3683A5]">2,012</span><p className="text-[#6E6E6E]">followers</p>
                    <span className="text-[#3683A5]">1,020</span><p className="text-[#6E6E6E]">following</p>
                    <span className="text-[#3683A5]">50</span><p className="text-[#6E6E6E]">connections</p>
                </div>
                <div className="space-x-4">
                    <button className="rounded-lg bg-[#0954A5] text-white p-2">+ BUTTON 1</button>
                    <button className="rounded-lg border-[#0954A5] border-[1px] text-[#0954A5] p-2">Button 2</button>
                    <button className="rounded-lg border-[#0954A5] border-[1px] text-[#0954A5] p-2">Button 3</button>
                </div>
                <hr />
                <div className="flex justify-center lg:space-x-14">
                    <div className="flex flex-col items-center">
                        <button className="rounded-2xl bg-[#8CD4F2] px-2"><Image src={ProductInfoIcon} width={24} height={24} alt="Project Icon"/></button>
                        <p>Project Description</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="rounded-2xl bg-[#8CD4F2] px-2"><Image src={ProgressIcon} width={24} height={24} alt="Progress Icon" /></button>
                        <p>Progress Updates</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="rounded-2xl bg-[#8CD4F2] px-2"><Image src={MarketIcon} width={24} height={24} alt="Market Icon" /></button>
                        <p>Market Opportunity</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button className="rounded-2xl bg-[#8CD4F2] px-2"><Image src={MoneyIcon} width={24} height={24} alt="Financial Icon" /></button>
                        <p>Financial Information</p>
                    </div>
                    <div className="flex flex-col items-center">   
                        <button className="rounded-2xl bg-[#8CD4F2] px-2"><Image src={InfinityIcon} width={24} height={24} alt="SDG Icon" /></button>
                        <p>SDGs/KPIs</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 p-4 rounded-lg shadow-md">
                    <p className="font-bold text-[16px]">About</p>
                    <p>dbsaodbosandosanojndsfnajnf;ladkfsa djnsadnfsdnfsankdnaksdn lksadlksan</p>
                </div>

                <div className="flex flex-col rounded-lg shadow-md gap-2 p-4">
                    <div className="flex space-x-3"><Image src={PhoneIcon} width={24} height={24} alt="Phone Icon" /><p>323-339-0786</p></div>
                    <div className="flex space-x-3"><Image src={EmailIcon} width={24} height={24} alt="Email Icon" /><p>email@palf.org</p></div>
                </div>

            </div>
        </div>
    )
}