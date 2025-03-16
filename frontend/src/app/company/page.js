"use client"
import Sidebar from "@/components/sidebar/sidebar";
import CompanyProf from "@/components/companyProf/companyProf";
import "@/app/globals.css"
const Company =  () =>{
    return (
        <div className="flex w-[100%] space-x-6 justify-center">
            <Sidebar />
            <CompanyProf />
        </div>
    )
}
export default Company