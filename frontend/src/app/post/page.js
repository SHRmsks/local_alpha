"use client";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import PostFull from "@/components/postfull/postfull";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css"
export default function Post() {
    const session_id = useSearchParams().get("session");
    console.log("session_id", session_id);
    return (
        <>
            <Navbar />
            <div className="flex lg:space-x-8 space-x-4 pt-6 justify-center bg-[#F7F3E8]">
                <Sidebar id={session_id} />
                <PostFull />
            </div>
        </>
    )
}