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
    <div className="w-full bg-linear-to-r from-[#5b21b6] via-[#7c3aed] to-[#5b21b6] text-white text-center py-2.5 px-4">
      <span className="font-mono text-[11px] tracking-[0.15em] uppercase">
        {announcements[currentIndex]}
      </span>
    </div>
  );
}
