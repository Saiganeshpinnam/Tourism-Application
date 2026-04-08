"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { stateDistricts } from "@/data/states-districts";

export default function StatePage({ params }: any) {
  const resolvedParams = use(params);

  const [districts, setDistricts] = useState<string[]>([]);
  const [state, setState] = useState("");

  useEffect(() => {
    const stateName = resolvedParams?.state;

    if (!stateName) return;

    const decodedState = decodeURIComponent(stateName);

    setState(decodedState);
    setDistricts(stateDistricts[decodedState] || []);
  }, [resolvedParams]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{state}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {districts.map((district) => (
          <Link
            key={district}
            href={`/districts/${encodeURIComponent(
              state
            )}/${encodeURIComponent(district)}`}
          >
            <div className="p-4 bg-green-100 rounded-lg hover:bg-green-200 cursor-pointer">
              {district}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}