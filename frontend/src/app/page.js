"use client";
import React, { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const outcome = fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName: "John", password: "123456" }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);
  return <div>Hello</div>;
}
