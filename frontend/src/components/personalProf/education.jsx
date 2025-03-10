import Image from "next/image";

export default function Education({ pic, name, location, titles, descriptions }) {
    return (
        <div className="flex flex-col gap-2 p-2">

            <div className="flex ml-2">
                <Image src={pic} width={40} height={40} alt="Education Picture" />
                <div className="ml-2">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="text-[#6E6E6E]">{location}</p>
                </div>
            </div>
            <hr />

            <div className="flex ml-2">
                <div className="flex flex-col w-[15%] gap-1">
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