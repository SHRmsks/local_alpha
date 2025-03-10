"use client"
import Sidebar from "@/components/sidebar";
import CompanyProf from "@/components/companyProf";
import "@/app/global.css"
const Company =  () =>{
    return (
        <div className="flex space-x-10 justify-center">
            <Sidebar />
            <CompanyProf />
        </div>
    )
}
export default Company