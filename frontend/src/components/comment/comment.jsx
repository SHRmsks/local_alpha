import Image from 'next/image'
import ThreeDotIcon from '../../../public/assets/threedots.svg'
import HeartIcon from '../../../public/assets/heart.svg'
import FullHeartIcon from '../../../public/assets/filledheart.svg'
import { useState } from 'react'

export default function Comment({ profilePic, name, title, comment, time, isHearted, heartFunc }) {
    const [ hearted, setHearted ] = useState(isHearted)

    return (
        <div className="space-y-3">
            <div className="flex justify-between">
                    <div className="flex">
                        <Image src={profilePic} width={29} height={29} alt="Occupation Picture" />
                        <div className="ml-2">
                            <div className="flex items-center">
                                <p className="text-sm">{name}</p>
                                <p className="text-[#004864] text-[9px] tracking-[2px] ml-4">{ 0 < 5 ? "JUST NOW" : time }</p>
                            </div>
                            <p className="text-[#858585] text-[12px]">{title}</p>
                        </div>
                    </div>
                                
                <button><Image src={ThreeDotIcon} width={29} height={29} alt="Other Options Icon" /></button>
            </div>

            <div className="w-[90%] mx-auto space-y-3">
                <p className="text-[16px]/[1.2]">{comment}</p>
                <div className="flex items-center space-x-6">
                    <button onClick={() => { setHearted(curr => !curr); heartFunc(id)}}><Image src={hearted ? FullHeartIcon : HeartIcon} width={24} height={24} alt="Heart Icon" /></button>
                    <button className="text-[#033073] font-bold">Reply</button>
                </div>
            </div>
        </div>
    )
}