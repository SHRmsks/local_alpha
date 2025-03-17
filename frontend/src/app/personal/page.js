"use client"
import Sidebar from "@/components/sidebar/sidebar";
import PersonalProf from "@/components/personalProf/personalProf";
import Navbar from "@/components/navbar/navbar";
import "@/app/globals.css"

const Personal =  () =>{
    return (
        <>
            <Navbar />
            <div className="flex lg:space-x-8 space-x-4 pt-6 justify-center bg-[#F7F3E8]">
                <Sidebar />
                <PersonalProf />
            </div>
        </>
    )
}
export default Personal