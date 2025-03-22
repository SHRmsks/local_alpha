"use client";
import Sidebar from "@/components/sidebar/sidebar";
import VCDashboard from "@/components/vcdashboard/vcdashboard";
import Navbar from "@/components/navbar/navbar";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css"
export default function Dashboard() {
    const session_id = useSearchParams().get("session");
    console.log("session_id", session_id);
    return (
        <>
            <Navbar />
            <div className="flex lg:space-x-8 space-x-4 pt-6 justify-center bg-[#F7F3E8]">
                <Sidebar id={session_id} />
                <VCDashboard />
            </div>
        </>
    )
}
export default Dashboard