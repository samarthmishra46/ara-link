"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialSeconds?: number;
}

export default function CountdownTimer({ initialSeconds = 587 }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) return 1799; // Reset to ~30 mins
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="font-mono text-sm text-[#edeae4] font-normal bg-[rgba(224,90,90,0.15)] py-1.5 px-3 border border-[rgba(224,90,90,0.3)]">
      {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
