import VCCard from "../vccard/vccard"
import Image from "next/image"
import GridIcon from '../../../public/assets/grid.svg'
import NotGridIcon from '../../../public/assets/gridNot.svg'
import ColumnIcon from '../../../public/assets/columns.svg'
import NotColumnIcon from '../../../public/assets/columnsNot.svg'
import SearchIcon from '../../../public/assets/search.svg'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react'


export default function VCDashboard() {
    const [isRows, setIsRows] = useState(false);

    const [isFavorites, setIsFavorites] = useState(false)
    const [isStarredCard, setIsStarredCard] = useState([
        {id: 1, isItStarred: false},
        {id: 2, isItStarred: false},
        {id: 3, isItStarred: false},
        {id: 4, isItStarred: false},
        {id: 5, isItStarred: false},
        {id: 6, isItStarred: false},
        {id: 7, isItStarred: false},
        {id: 8, isItStarred: false},
        {id: 9, isItStarred: false},
        {id: 10, isItStarred: false},
        {id: 11, isItStarred: false},
        {id: 12, isItStarred: false},
        {id: 13, isItStarred: false},
        {id: 14, isItStarred: false},
        {id: 15, isItStarred: false}
    ])
    const getStar = (id) => {
        setIsStarredCard((prevCards) =>
            prevCards.map((card) =>
                card.id === id ? { ...card, isItStarred: !card.isItStarred } : card
            )
        );
    }
    const starredCards = isStarredCard.filter((card) => card.isItStarred);

    const colors = ["#72DBFF", "#FF7272", "#FFE84B"];

    const [numberOfColumns, setNumberOfColumns] = useState(3); 

    useEffect(() => {
        const updateNumberOfColumns = () => {
            if (window.matchMedia("(max-width: 639px)").matches) {
                console.log("Setting 1 column");
                setNumberOfColumns(1);
            } else if (window.matchMedia("(max-width: 1023px)").matches) {
                console.log("Setting 2 columns");
                setNumberOfColumns(2);
            } else {
                console.log("Setting 3 columns");
                setNumberOfColumns(3);
            }
        };
        updateNumberOfColumns();
        window.addEventListener("resize", updateNumberOfColumns);

        return () => window.removeEventListener("resize", updateNumberOfColumns);
    }, []);

    const [dataLength, setDataLength] = useState(Array.from({ length: 15 }));

    const loadMoreCards = () => {
        const newCards = [];
        const startId = isStarredCard.length + 1; // Start from the next ID
        const endId = startId + 14; // Add 15 more cards
    
        for (let id = startId; id <= endId; id++) {
            newCards.push({ id, isItStarred: false });
        }
    
        // Update state by appending new cards
        setIsStarredCard((prevCards) => [...prevCards, ...newCards]);
    };

    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 15 more records in 1.5 secs
        setTimeout(() => {
            setDataLength((prevItems) => prevItems.concat(Array.from({ length: 15 })));
            loadMoreCards();
        }, 1500);
    };

    return (
        <div className="2xl:w-[60%] xl:w-[70%] w-[80%] gap-6">
            <div className="flex justify-between">
                <p className="text-3xl">VC Dashboard</p>
                <div className="flex">
                    <button onClick={() => setIsRows(curr => !curr)}><Image src={isRows ? ColumnIcon : NotColumnIcon } width={31} height={31} alt="" /></button>
                    <button onClick={() => setIsRows(curr => !curr)}><Image src={isRows ? NotGridIcon : GridIcon } width={31} height={31} alt="" /></button>
                </div>
            </div>
            <hr className="border-black mt-1" />
            <div className="flex justify-between mt-8 w-full">
                <div className="flex space-x-4">
                    <div className="flex justify-between bg-[#FFFEFA] lg:w-[500px] sm:w-[40vw] w-30vw rounded-lg shadow-md px-4 py-3">
                        <input type="text" placeholder="Type anything you are looking for" className="w-[90%]">
                        </input><Image src={SearchIcon} width={20} height={20} alt="Search Icon" />
                    </div>
                    <button className="rounded-lg bg-[#0954A5] border-[1px] text-center text-white font-bold px-4 py-3">Search</button>
                </div>
                <button onClick={() => setIsFavorites(curr => !curr)} className={`border-[1px] ${ isFavorites ? "bg-[#FAE9A8]" : "bg-white" } text-center text-black px-4 py-3`}>Favorites</button>
            </div>
            <div className="mt-8 mx-auto">
                { isFavorites ? (
                    <>
                    { isRows ? (
                        <div className="flex flex-col gap-6" key="rowLayout">
                            {starredCards.map((card) => <VCCard key={card.id} id={card.id} isARow={true} color={colors[card.id % 3]} starFunc={getStar} star={card.isItStarred} />)}
                        </div>
                    ):(
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 justify-items-center gap-x-4 gap-y-8" key="gridLayout">
                            {starredCards.map((card) => <VCCard key={card.id} id={card.id} isARow={false} color={colors[card.id % numberOfColumns]} starFunc={getStar} star={card.isItStarred} />)}
                        </div>
                    ) }
                    </>
                ) : (
                    <InfiniteScroll
                        dataLength={dataLength.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<h4 className="text-2xl p-4">Loading...</h4>}
                    >
                        { isRows ? (
                            <div className="flex flex-col gap-6" key="rowLayout">
                                {isStarredCard.map((card) => <VCCard key={card.id} id={card.id} isARow={true} color={colors[card.id % 3]} starFunc={getStar} star={card.isItStarred} />)}
                            </div>
                        ):(
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 justify-items-center gap-x-4 gap-y-8" key="gridLayout">
                                {isStarredCard.map((card) => <VCCard key={card.id} id={card.id} isARow={false} color={colors[card.id % numberOfColumns]} starFunc={getStar} star={card.isItStarred} />)}
                            </div>
                        )}
                    </InfiniteScroll>
                )}
            </div>
        </div>
    )
}