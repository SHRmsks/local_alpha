"use client"
import Sidebar from "@/components/sidebar/sidebar"
import VCDashboard from "@/components/vcdashboard/vcdashboard"
import Navbar from "@/components/navbar/navbar"
import "@/app/globals.css"
const Dashboard =  ()=>{
    return (
        <>
            <Navbar />
            <div className="flex lg:space-x-8 space-x-4 pt-6 justify-center bg-[#F7F3E8]">
                <Sidebar />
                <VCDashboard />
            </div>
        </>
    )
}
export default Dashboard
