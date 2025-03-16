import Image from "next/image";

export default function Occupation({ title, subtitle, titles, descriptions }) {
    return (
        <div className="flex flex-col gap-2 p-2">

            <div className="ml-2">
                <p className="font-bold text-lg">{title}</p>
                <p className="text-[#6E6E6E]">{subtitle}</p>
            </div>
            <hr />
            
            <div className="flex ml-2">
                <div className="flex flex-col w-[20%] sm:w-[15%] gap-1">
                    { 
                        titles.map((item, index) => (
                            <p className="text-[#6E6E6E] font-bold" key={index}>{item}</p>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-1">
                { 
                        descriptions.map((item, index) => (
                            <p className="text-[#6E6E6E]" key={index}>{item}</p>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}