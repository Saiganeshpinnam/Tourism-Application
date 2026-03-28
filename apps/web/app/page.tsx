"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [states, setStates] = useState<string[]>([]);

 useEffect(() => {
  fetch("http://127.0.0.1:8080/places/states") // ✅ CORRECT URL
    .then(res => res.json())
    .then(data => {
      setStates(Array.isArray(data) ? data : []); // ✅ safety
    })
    .catch(err => {
      console.error(err);
      setStates([]);
    });
}, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Explore India 🇮🇳
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(states) &&
  states.map((state) => (
    <Link key={state} href={`/states/${state}`}>
      <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl cursor-pointer">
        <h2 className="text-xl font-semibold">{state}</h2>
      </div>
    </Link>
))}
      </div>
    </div>
  );
}