import Image from 'next/image'
import ThreeDotIcon from '../../../public/assets/threedots.svg'
import EmojiIcon from '../../../public/assets/emoji.svg'
import FileIcon from '../../../public/assets/file.svg'
import MessageIcon from '../../../public/assets/message.svg'
import FullKittyImg from '../../../public/assets/biggerkitty.svg'
import SearchIcon from '../../../public/assets/search.svg'
import GenericAv from '../../../public/assets/genericAv.svg'
import ProfileImg from '../../../public/assets/profileImg.svg'
import DropdownIcon from '../../../public/assets/dropdown.svg'
import Comment from '../comment/comment'
import { useState, useEffect } from 'react'

export default function PostFull() {
    // This logic is technically too complicated for it's function
    // However I coded it on the dashboard so it wasn't hard to do
    // And it leaves room to be fun later
    const [ isHeartedComment, setIsHeartedComment ] = useState([
        {id: 1, isHearted: false},
        {id: 2, isHearted: false}
    ])

    const getHeart = (id) => {
        setIsHeartedComment((prevComms) =>
            prevComms.map((comm) => 
                comm.id === id ? { ...comm, isHearted: !comm.isHearted } : comm
            )   
        );
    }

    const loadMoreComments = () => {
        let newComms = [];
        const startId = isHeartedComment.length + 1;
        const endId = startId + 1;

        for (let id = startId; id <= endId; id++) {
            newComms.push({ id, isHearted: false })
        }
        setIsHeartedComment((prevComms) => [...prevComms, ...newComms]);
    }

    const [numberOfPics, setNumberOfPics] = useState(3); 
        
    useEffect(() => {
        const updateNumberOfPics = () => {
            if (window.matchMedia("(max-width: 639px)").matches) {
                console.log("Setting 1 column");
                setNumberOfPics(1);
            } else if (window.matchMedia("(max-width: 1023px)").matches) {
                console.log("Setting 2 columns");
                setNumberOfPics(2);
            } else {
                console.log("Setting 3 columns");
                setNumberOfPics(3);
            }
        };
        updateNumberOfPics();
        window.addEventListener("resize", updateNumberOfPics);
    
        return () => window.removeEventListener("resize", updateNumberOfPics);
    }, []);

    return (
        <div className="2xl:w-[60%] xl:w-[70%] w-[80%] space-y-4">
            <div className="flex space-x-4">
                <div className="flex justify-between bg-[#FFFEFA] border-[#124A9D] border-[1px] lg:w-[80%] sm:w-[70%] w-60% rounded-md shadow-md px-4 py-2">
                    <input type="text" placeholder="Type anything you are looking for" className="w-[90%]">
                    </input><Image src={SearchIcon} width={28} height={28} alt="Search Icon" />
                </div>
                <button className="rounded-lg bg-[#0954A5] border-[1px] text-center text-white font-bold px-8 py-[10px]">Search</button>
            </div>
            <button className="text-[#004864] tracking-[1px]">BACK TO FEED</button>
            
            <div className="flex flex-col rounded-lg shadow-md bg-[#FFFEFA] gap-4 p-5">

                <div className="flex justify-between">
                    <div className="flex">
                        <Image src={GenericAv} width={40} height={40} alt="Occupation Picture" />
                        <div className="ml-2">
                            <div className="flex items-center">
                                <p className="text-sm">New Orleans Legal Service. LLC</p>
                                <p className="text-[#004864] text-[9px] tracking-[2px] ml-4">{ 0 < 5 ? "JUST NOW" : time }</p>
                            </div>
                            <p className="text-[#6E6E6E] text-[10px]">Legal Services Company</p>
                        </div>
                        
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button className="bg-[#124A9D] text-sm text-white rounded-lg px-4 py-1">Follow</button>
                        <button><Image src={ThreeDotIcon} width={24} height={24} alt="Other Options Icon" /></button>
                    </div>
                </div>

                <div className="flex w-[95%] mx-auto space-x-4">
                    <div className="flex flex-col gap-6">
                        <p className="text-2xl">[Title] Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        <p className="text-[#004864] line-clamp-5">[Body] Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    { FullKittyImg && (
                        <div className="flex w-[80%] mx-auto justify-between">
                            {Array.from({ length: numberOfPics }).map((_, i) => <Image key={i} src={FullKittyImg} width={185} height={153} alt="Post Image" className="rounded-md" />)}
                        </div>
                    )}
                    </div>
                </div>

                <hr />
                
                <div className="flex justify-center space-x-2">
                    <Image src={ProfileImg} width={30} height={30} alt="Profile Picture" />
                    <div className="rounded-2xl border-[#124A9D] border-[1px] w-[70%] px-4 py-1">
                        <input type="text" placeholder="Write your feedback..." className="w-[90%]" />
                    </div>
                    <button><Image src={EmojiIcon} width={24} height={24} alt="Emoji Icon" /></button>
                    <button><Image src={FileIcon} width={24} height={24} alt="File Icon" /></button>
                    <button><Image src={MessageIcon} width={24} height={24} alt="Message Icon" /></button>
                </div>

                <hr />

                <div className="flex flex-col gap-6">

                    <div className="flex justify-between">
                        <p className="text-xl font-bold">Comments</p>
                        <div className="flex space-x-4">
                            <Image src={DropdownIcon} width={16} height={16} alt="Sort icon" />
                            <p className="font-bold">Sort</p>
                        </div>
                    </div>

                    { isHeartedComment.map((comm) => <Comment key={comm.id} id={comm.id} profilePic={ProfileImg} name={"[Name]"} title={"[Title]"} comment={"[Comment] Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "} time={0} isHearted={false} heartFunc={getHeart} /> )}
                    
                    <button onClick={loadMoreComments} className="text-[#004864] text-[9px] tracking-[2px] mx-auto mt-4">READ MORE</button>

                </div>
            </div>
        </div>
    )
}