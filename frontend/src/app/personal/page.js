"use client"
import Sidebar from "@/components/sidebar";
import PersonalProf from "@/components/personalProf/personalProf";
import "@/app/global.css"
const Personal =  () =>{
    return (
        <div className="flex xl:space-x-12 lg:space-x-8 space-x-4 justify-center bg-[#F7F3E8]">
            <Sidebar />
            <PersonalProf />
        </div>
    )
}
export default Personal