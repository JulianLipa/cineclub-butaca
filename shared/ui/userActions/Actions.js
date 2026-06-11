"use client";

import { useState, useRef, useCallback } from "react";
import Button from "@/shared/ui/button/Button";

const ACTIONS = [
  { icon: "eye", value: 28 },
  { icon: "like", value: 28 },
  { icon: "comentarios", value: 28 },
  { icon: "star", value: 28 },
  { icon: "watchlistAdd", value: 28 },
];

const Actions = ({ icons, className, variant, divClassname, extra }) => {
  const [activeIcons, setActiveIcons] = useState(new Set());
  const timers = useRef({});

  const handleClick = useCallback((icon) => {
    clearTimeout(timers.current[icon]);
    setActiveIcons((prev) => new Set([...prev, icon]));
    timers.current[icon] = setTimeout(() => {
      setActiveIcons((prev) => {
        const next = new Set(prev);
        next.delete(icon);
        return next;
      });
    }, 800);
  }, []);

  const filtered = ACTIONS.filter((a) => icons?.includes(a.icon));

  return (
    <div className={`flex gap-2 sm:gap-4 ${divClassname}`}>
      {filtered.map((item) => (
        <Button
          key={item.icon}
          variant={activeIcons.has(item.icon) ? "success" : variant}
          className={`bodyText ${className}`}
          icon={item.icon}
          onClick={() => handleClick(item.icon)}
        >
          {item.value}
        </Button>
      ))}
      {extra}
    </div>
  );
};

export default Actions;
