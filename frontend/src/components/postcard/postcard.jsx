import Image from "next/image"
import Tagicon from '../../../public/assets/tagIcon.svg'
import ThreeDotIcon from '../../../public/assets/threedots.svg'
import ImageBackIcon from '../../../public/assets/imageBack.svg'
import ImageFrontIcon from '../../../public/assets/imageFront.svg'
import EmojiIcon from '../../../public/assets/emoji.svg'
import FileIcon from '../../../public/assets/file.svg'
import MessageIcon from '../../../public/assets/message.svg'

export default function PostCard({ companyPic, companyName, companySubtitle, time, title, text, profilePic, postPic }) {
    return (
        <div className="flex flex-col rounded-lg shadow-md bg-[#FFFEFA] gap-3 p-5">
            
            <div className="flex justify-between">
                <div className="flex">
                    <Image src={companyPic} width={40} height={40} alt="Occupation Picture" />
                    <div className="ml-2">
                        <div className="flex items-center">
                            <p className="text-sm">{companyName}</p>
                            <p className="text-[#004864] text-[9px] tracking-[2px] ml-4">{ time < 5 ? "JUST NOW" : time }</p>
                        </div>
                        <p className="text-[#6E6E6E] text-[10px]">{companySubtitle}</p>
                    </div>
                    
                </div>
                
                <div className="flex items-center space-x-4">
                    <button className="flex w-[31px] h-[25] bg-[#EDEDED] justify-center"><Image src={Tagicon} width={15} height={15} alt="Tag Icon" /></button>
                    <button className="bg-[#124A9D] text-sm text-white rounded-lg px-4 py-1">Follow</button>
                    <button><Image src={ThreeDotIcon} width={24} height={24} alt="Other Options Icon" /></button>
                </div>
            </div>
            
            <div className="flex w-[95%] mx-auto space-x-4">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl">{title}</p>
                    <p className="text-[#004864] text-[12px] line-clamp-5">{text}</p>
                    <button className="text-[#004864] text-[9px] tracking-[2px] mr-auto mt-4">READ MORE</button>
                </div>
                { postPic && (
                    <div className="sm:visible collapse sm:w-[185px] w-0 relative flex-shrink-0 ">
                        <Image src={postPic} width={185} height={153} alt="Post Image" className="rounded-md" /> 
                        <button className="absolute left-2 top-[76px] transform -translate-y-1/2">
                            <Image src={ImageBackIcon} width={12} height={27} alt="Previous Image" />
                        </button>
                        <button className="absolute right-2 top-[76px] transform -translate-y-1/2">
                            <Image src={ImageFrontIcon} width={12} height={27} alt="Next image" />
                        </button>
                    </div>
                )}
            </div>

            
            <hr />

            <div className="flex justify-center space-x-2">
                <Image src={profilePic} width={30} height={30} alt="Profile Picture" />
                <div className="rounded-2xl border-[#124A9D] border-[1px] w-[70%] px-4 py-1">
                    <input type="text" placeholder="Write your feedback..." className="w-[90%]" />
                </div>
                <button><Image src={EmojiIcon} width={24} height={24} alt="Emoji Icon" /></button>
                <button><Image src={FileIcon} width={24} height={24} alt="File Icon" /></button>
                <button><Image src={MessageIcon} width={24} height={24} alt="Message Icon" /></button>
            </div>

        </div>
    )
}