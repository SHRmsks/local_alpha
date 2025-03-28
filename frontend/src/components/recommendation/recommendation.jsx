import Image from 'next/image'
import PlusSignIcon from '../../../public/assets/plussign.svg'

export default function Recommendation({ name, subtitle, pic }) {
    return (
        <div className="flex items-center">
            <Image src={pic} width={40} height={40} alt="Occupation Picture" />
            <div className="ml-2">
                <p className="font-bold text-[16px]">{name}</p>
                <p className="text-[#6E6E6E] text-[13px] mb-1">{subtitle}</p>
            </div>
            <button className="bg-[#F5CF67] rounded-lg ml-2 px-3 py-2"><Image src={PlusSignIcon} width={20} height={20} alt="Follow Button" /></button>
        </div>
    )
}