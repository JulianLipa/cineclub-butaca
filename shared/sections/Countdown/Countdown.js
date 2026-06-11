"use client";

import { useState, useEffect } from "react";
import { eventos } from "@/data.json";

const getNextFuncion = () => {
  const now = new Date();
  const upcoming = Object.entries(eventos)
    .filter(([, e]) => e.type === "funcion")
    .map(([date, e]) => ({ date: new Date(date + "T00:00:00"), title: e.title }))
    .filter(({ date }) => date >= now)
    .sort((a, b) => a.date - b.date);
  return upcoming[0] ?? null;
};

const calcTimeLeft = (target) => {
  const diff = target - new Date();
  if (diff <= 0) return null;
  return {
    dias: Math.floor(diff / 86400000),
    hs: Math.floor((diff % 86400000) / 3600000),
    min: Math.floor((diff % 3600000) / 60000),
    seg: Math.floor((diff % 60000) / 1000),
  };
};

const Unit = ({ value, label }) => (
  <span className="flex flex-col items-center leading-none">
    <span className="font-semibold text-[1.1rem]">{String(value).padStart(2, "0")}</span>
    <span className="text-[0.6rem] uppercase tracking-widest opacity-60">{label}</span>
  </span>
);

const Countdown = () => {
  const next = getNextFuncion();
  const [timeLeft, setTimeLeft] = useState(next ? calcTimeLeft(next.date) : null);

  useEffect(() => {
    if (!next) return;
    const id = setInterval(() => setTimeLeft(calcTimeLeft(next.date)), 1000);
    return () => clearInterval(id);
  }, [next?.date]);

  if (!next || !timeLeft) return null;

  return (
    <div className="flex items-center justify-between gap-4 border border-(--primary) rounded-xl px-6 py-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-[0.65rem] uppercase tracking-widest opacity-60">Próxima función</span>
        <span className="font-semibold text-sm">{next.title}</span>
      </div>

      <div className="flex items-center gap-3">
        <Unit value={timeLeft.dias} label="días" />
        <span className="opacity-40 mb-1">:</span>
        <Unit value={timeLeft.hs} label="hs" />
        <span className="opacity-40 mb-1">:</span>
        <Unit value={timeLeft.min} label="min" />
        <span className="opacity-40 mb-1">:</span>
        <Unit value={timeLeft.seg} label="seg" />
      </div>
    </div>
  );
};

export default Countdown;
