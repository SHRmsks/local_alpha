import Image from "next/image";
import KittyImg from '../../../public/assets/kitty.svg'
import FullKittyImg from '../../../public/assets/fullkitty.svg'
import TextBubbleIcon from '../../../public/assets/textbubble.svg'
import BookIcon from '../../../public/assets/book.svg'
import StarIcon from '../../../public/assets/star.svg'
import YellowStarIcon from '../../../public/assets/yellowstar.svg'
import { useState } from 'react'

export default function VCCard({ isARow, color, starFunc, id, star }) {
    const [isStarred, setIsStarred] = useState(star);

    return (
        <>
            { isARow ? (
                    <div className="flex w-[95%] m-auto" key="row">
                        <div className="w-[19px]" style={{ backgroundColor: color}}></div>
                        <Image src={FullKittyImg} width={130} height={130} alt="Company Image"/>
                        <div className="flex justify-between shadow-md w-full h-[130px] bg-[#FFFEFA] p-3">
                            <div className="flex flex-col gap-3">
                                <p className="text-xl font-bold">Company Name</p>
                                <p className="text-[12px]/[14px] text-gray-400">The trombone is a brass instrument that was invented by John Trombone in 1669 in France.</p>
                                <hr />
                                <div className="flex justify-between">
                                    <div className="flex space-x-6">
                                        <button><Image src={TextBubbleIcon} width={20} height={20} alt='Text Bubble Icon' /></button>
                                        <button><Image src={BookIcon} width={20} height={20} alt='Book Icon' /></button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => { setIsStarred(curr => !curr); starFunc(id)}}><Image src={ isStarred ? YellowStarIcon : StarIcon} width={30} height={30} className="mr-4" alt='Star Icon' /></button>
                        </div>
                    </div>
            )   :   (
                    <div key="grid">
                        <div className="relative flex flex-col shadow-md w-[270px] h-[270px] bg-no-repeat bg-top bg-[#FFFEFA] gap-3 p-4" style={{ backgroundImage: `url('${KittyImg.src}')`, backgroundSize: "auto 120px" }}>
                            <p className="text-xl font-bold mt-[45%]">Company Name</p>
                            <p className="text-[12px]/[14px] text-gray-400">The trombone is a brass instrument that was invented by John Trombone in 1669 in France.</p>
                            <hr />
                            <div className="flex justify-between">
                                <div className="flex space-x-6">
                                    <button><Image src={TextBubbleIcon} width={20} height={20} alt='Text Bubble Icon' /></button>
                                    <button><Image src={BookIcon} width={20} height={20} alt='Book Icon' /></button>
                                </div>
                                <button onClick={() => { setIsStarred(curr => !curr); starFunc(id)}}><Image src={ isStarred ? YellowStarIcon : StarIcon} width={20} height={20} alt='Star Icon' /></button>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[7px]" style={{ backgroundColor: color}}></div>
                        </div>
                    </div>
            )}
        </>
        
    )
}