"use client";

import { countSelector, useCounter } from "@/store/useCounter";

export function Counter() {
  const { count, dec, inc } = useCounter(countSelector);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center">{count}</p>
      <button onClick={inc} className="ring-1">
        inc
      </button>
      <button onClick={dec}>dec</button>
    </div>
  );
}
