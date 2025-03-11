"use client"
import Sidebar from "@/components/sidebar/sidebar";
import { useSearchParams } from "next/navigation";
import "@/app/global.css"



const Dashboard =  ()=>{
const session_id = useSearchParams().get('session');
    return (
        <div>
            <Sidebar />
        </div>
    )
}
export default Dashboard