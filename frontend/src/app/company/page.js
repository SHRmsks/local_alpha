"use client"
import Sidebar from "@/components/sidebar/sidebar";
import CompanyProf from "@/components/companyProf/companyProf";
import Navbar from "@/components/navbar/navbar";
import "@/app/globals.css"
const Company =  () =>{
    return (
        <>
            <Navbar />
            <div className="flex lg:space-x-8 space-x-4 pt-6 justify-center bg-[#F7F3E8]">
                <Sidebar />
                <CompanyProf />
            </div>
        </>
    )
}
export default Company