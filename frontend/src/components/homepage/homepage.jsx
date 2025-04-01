import Recommendation from "../recommendation/recommendation";
import PostCard from "../postcard/postcard";
import Image from "next/image";
import FullKittyImg from '../../../public/assets/biggerkitty.svg'
import SearchIcon from '../../../public/assets/search.svg'
import GenericAv from '../../../public/assets/genericAv.svg'
import ProfileImg from '../../../public/assets/profileImg.svg'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react'

export default function Homepage() {
    
    const [dataLength, setDataLength] = useState(Array.from({ length: 10 }));
    
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 15 more records in 1.5 secs
        setTimeout(() => {
            setDataLength((prevItems) => prevItems.concat(Array.from({ length: 10 })));
        }, 1500);
    };

    const [numberOfRecs, setNumberOfRecs] = useState(3); 
    
    useEffect(() => {
        const updateNumberOfRecs = () => {
            if (window.matchMedia("(max-width: 639px)").matches) {
                console.log("Setting 1 column");
                setNumberOfRecs(1);
            } else if (window.matchMedia("(max-width: 1023px)").matches) {
                console.log("Setting 2 columns");
                setNumberOfRecs(2);
            } else {
                console.log("Setting 3 columns");
                setNumberOfRecs(3);
            }
        };
        updateNumberOfRecs();
        window.addEventListener("resize", updateNumberOfRecs);

        return () => window.removeEventListener("resize", updateNumberOfRecs);
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
            <div>
                <p className="text-2xl">Who to follow</p>
                <hr className="border-black mt-1" />
            </div>
            <div className="flex justify-between">
                { Array.from({ length: numberOfRecs }).map((_, i) => <Recommendation key={i} name={"New Orleans"} subtitle={"Legal Services Company"} pic={GenericAv}/> )}
            </div>
            
            <InfiniteScroll
                dataLength={dataLength.length}
                next={fetchMoreData}
                hasMore={true}
                loader={
                    <div className="flex flex-col rounded-lg bg-[#FFFEFA] shadow-md gap-3 p-5">
                        <Skeleton className="w-[20%]" />
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-[95%] gap-2">
                                <Skeleton className="h-6" />
                                <Skeleton count={6} />
                            </div>
                            <Skeleton className="h-[185px] w-[153px]" />
                        </div>
                        <hr />
                        <Skeleton className="w-[70%] mx-auto" />
                    </div>
                }
                className="flex flex-col gap-10 mt-10"
            >

                {dataLength.map((i, index) => ( 
                    <PostCard key={index} companyPic={GenericAv} companyName={"New Orleans Legal Service. LLC"} companySubtitle={"Legal Services Company"} time={0} title={"[Title] Lorem ipsum dolor sit amet, consectetur adipiscing"} text={"[Body] Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "} profilePic={ProfileImg} postPic={FullKittyImg} />
                ))}

            </InfiniteScroll>
        </div>
    )
}