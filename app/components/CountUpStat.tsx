"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
  icon?: React.ReactNode;
}

export default function CountUpStat({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
  isVisible,
  icon,
}: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      setIsAnimating(true);

      // Extract numeric value
      const numValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
      if (isNaN(numValue)) {
        // If not a number, just show the value
        setCount(numValue);
        return;
      }

      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (numValue - startValue) * easeOut;

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(numValue);
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, value, duration]);

  // Format the display value
  const formatValue = (val: number): string => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + "M";
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + "K";
    }
    return Math.floor(val).toString();
  };

  const displayValue = typeof value === "string" && value.includes("%")
    ? value
    : typeof value === "string" && !/^\d/.test(value)
    ? value
    : `${prefix}${isAnimating ? formatValue(count) : value}${suffix}`;

  return (
    <div className="bg-[#0a0e1a]/50 border border-cyan-500/20 rounded-xl p-6 transition-all duration-500 hover:shadow-lg hover:border-cyan-400 hover:scale-105 group">
      {icon && (
        <div className="mb-3 icon-animate">
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold text-white mb-2">{displayValue}</div>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );
}

