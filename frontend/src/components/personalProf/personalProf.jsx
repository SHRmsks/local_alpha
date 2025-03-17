import Image from 'next/image'
import LargeProfile from '../../../public/assets/profileLg.svg'
import ProfilePic from '../../../public/assets/profileImg.svg'
import GenericAv from '../../../public/assets/genericAv.svg'
import PhoneIcon from '../../../public/assets/Phone.svg'
import EmailIcon from '../../../public/assets/email.svg'
import BdayIcon from '../../../public/assets/bday.svg'
import Dropdown from '../../../public/assets/dropdown.svg'
import Occupation from '../occupation/occupation'
import Education from '../education/education'

console.log(LargeProfile)

export default function PersonalProf() {
    return (
        <div className="flex flex-col xl:w-[70%] lg:w-[75%] w-[80%] gap-6">
            {/* Background Image works if the image is already cropped which I will assume it is*/}
            <div className="rounded-3xl shadow-md bg-no-repeat bg-top bg-[#FFFEFA] p-6" style={{ backgroundImage: `url('${LargeProfile.src}')`, backgroundSize: "auto 120px" }}>
                <div className="flex justify-between">
                    <div className="flex flex-col mt-8 gap-2">
                        <div className="flex">
                            <Image src={ProfilePic} width={120} height={120} alt="Profile Picture" className="rounded-[50%]" />
                            <div className="mt-[60px] ml-2">
                                <p className="text-2xl">Name</p>
                                <p className="text-[#6E6E6E]">Description and short bio about the individual</p>
                            </div>
                        </div>
                        <div className="flex space-x-1 sm:space-x-4 ml-2">
                            <div className="flex space-x-2"><span className="text-[#3683A5]">2,012</span><p className="text-[#6E6E6E]">followers</p></div>
                            <div className="flex space-x-2"><span className="text-[#3683A5]">1,020</span><p className="text-[#6E6E6E]">following</p></div>
                            <div className="flex space-x-2"><span className="text-[#3683A5]">50</span><p className="text-[#6E6E6E]">connections</p></div>
                        </div>
                        <div className="space-x-4">
                            <button className="rounded-lg bg-[#0954A5] text-white text-[14px] px-4 py-2">EDIT PROFILE</button>
                            <button className="rounded-lg border-[#0954A5] border-[1px] text-[#0954A5] text-[14px] px-4 py-2">Button 2</button>
                            <button className="rounded-lg border-[#0954A5] border-[1px] text-[#0954A5] text-[14px] px-4 py-2">Button 3</button>
                        </div>
                    </div>
                    <div className="collapse w-0 h-0 lg:visible lg:w-auto lg:h-auto">
                        <p className="font-bold text-xl mt-[120px]">Occupation</p>
                        <div className="flex mt-2">
                            <Image src={GenericAv} width={40} height={40} alt="Occupation Picture" />
                            <div className="ml-2">
                                <p className="font-bold text-lg">Senior Data Analyst</p>
                                <p className="text-[#6E6E6E]">at New Orleans Legal Services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col rounded-3xl shadow-md bg-[#FFFEFA] gap-2 p-5">
                <p className="font-bold text-xl">Basic Information</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:space-x-1 md:space-x-6">
                    <div className="flex space-x-2"><Image src={PhoneIcon} width={22} height={22} alt="Phone Icon" /><p>323-449-0786</p></div>
                    <div className="flex space-x-2"><Image src={EmailIcon} width={22} height={22} alt="Email Icon" /><p>email@palf.org</p></div>
                    <div className="flex space-x-2"><Image src={BdayIcon} width={22} height={22} alt="Birthday Icon" /><p>January 1st, 2024</p></div>
                </div>
            </div>

            <div className="rounded-3xl shadow-md bg-[#FFFEFA] space-y-2 p-5">
                <p className="font-bold text-xl">About</p>
                <p className="text-sm/4">The series depicts a conflict between Skibidi Toilets—singing human-headed toilets—and humanoids with CCTV cameras, speakers, and televisions in place of their heads. The Skibidi Toilets, led by G-Toilet, overtake humanity. Warfare soon develops between the toilets and the alliance of Cameramen, Speakermen, and TV-men.</p>
            </div>

            <div className="rounded-3xl shadow-md bg-[#FFFEFA] space-y-5 p-5">
                <p className="font-bold text-xl">Education</p>
                <Education 
                    pic={GenericAv}
                    name="Education 1" 
                    location="at New Orleans Legal Services" 
                    titles={["Title 1", "Title 2", "Title 3", "Title 4"]} 
                    descriptions={["apnsdona", "apnsaaadona", "apnsdoadsadana", "apnsdonaasda"]} 
                />
                <Education 
                    pic={GenericAv} 
                    name="Education 2" 
                    location="at New Orleans Legal Services" 
                    titles={["Title 1", "Title 2", "Title 3", "Title 4"]} 
                    descriptions={["apnsdona", "apnsaaadona", "apnsdoadsadana", "apnsdonaasda"]} 
                />
                <div className="flex p-4 space-x-2">
                    <p className="text-lg">View More</p><Image src={Dropdown} width={24} height={24} alt="Dropdown Icon" />
                </div>
            </div>

            <div className="rounded-3xl shadow-md bg-[#FFFEFA] space-y-5 gap-2 p-5">
                <p className="font-bold text-xl">Occupation</p>
                <Occupation 
                    title="[Title]" 
                    subtitle="Subtitle" 
                    titles={["Title 1", "Title 2", "Title 3", "Title 4"]} 
                    descriptions={["apnsdona", "apnsaaadona", "apnsdoadsadana", "apnsdonaasda"]} 
                />
                <Occupation 
                    title="[Title]" 
                    subtitle="Subtitle" 
                    titles={["Title 1", "Title 2", "Title 3", "Title 4"]} 
                    descriptions={["apnsdona", "apnsaaadona", "apnsdoadsadana", "apnsdonaasda"]} 
                />
                <div className="flex p-4 space-x-2">
                    <p className="text-lg">View More</p><Image src={Dropdown} width={24} height={24} alt="Dropdown Icon" />
                </div>
            </div>

            <div className="flex justify-between">

                <div className="rounded-3xl shadow-md bg-[#FFFEFA] w-[49%] p-5">
                    <p className="font-bold text-xl">Skills</p>
                    <div className="flex flex-col gap-2 p-2">
                        <p className="font-bold text-lg">[Title]</p>
                        <p className="text-[#6E6E6E]">Subtitle</p>
                        <hr />
                        <p className="font-bold text-lg">[Title]</p>
                        <p className="text-[#6E6E6E]">Subtitle</p>
                    </div>
                </div>

                <div className="rounded-3xl shadow-md bg-[#FFFEFA] w-[49%] p-5">
                    <p className="font-bold text-xl">Awards</p>
                    <div className="flex flex-col gap-2 p-2">
                        <p className="font-bold text-lg">[Title]</p>
                        <p className="text-[#6E6E6E]">Subtitle</p>
                        <hr />
                        <p className="font-bold text-lg">[Title]</p>
                        <p className="text-[#6E6E6E]">Subtitle</p>
                    </div>
                </div>

            </div>

        </div>
    )
}