"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css";

export default function Dashboard() {
  const session_id = useSearchParams().get("session");
  console.log("session_id", session_id);
  return (
    <div>
      <Sidebar id={session_id} />
    </div>
  );
};
