"use client";

import { useState, useEffect } from "react";

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const announcements = [
    "🧊 Free shipping across India · Only 17 units left · Dermatologist tested",
    "✨ New: Complete Ritual Kit now available · Save ₹648",
    "🎁 Use code COLDTHERAPY for 10% off your first order",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="bg-[#6aafbf] text-[#05080a] text-center py-2.5 px-5 font-mono text-[11px] tracking-[0.2em] uppercase relative z-50">
      <span className="font-normal transition-opacity duration-300">
        {announcements[currentIndex]}
      </span>
    </div>
  );
}
