"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStates } from "@/services/api";

export default function Home() {
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getStates();
      setStates(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore India 🇮🇳</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {states.map((state) => (
          <Link key={state} href={`/states/${state}`}>
            <div className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer">
              {state}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}