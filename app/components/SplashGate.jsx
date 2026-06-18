"use client";

import { useEffect, useState, useRef } from "react";
import SplashScreen from "./SplashScreen";

// Global variable to persist splash completion state across client-side page navigations / re-renders
let hasSplashCompleted = false;

export default function SplashGate({ children }) {
  const [showSplash, setShowSplash] = useState(() => !hasSplashCompleted);
  const timerRef = useRef(null);

  useEffect(() => {
    if (hasSplashCompleted) {
      setShowSplash(false);
      return;
    }

    // Set splash timer only once
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        hasSplashCompleted = true;
        setShowSplash(false);
        timerRef.current = null;
      }, 1500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className={showSplash ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>

      {showSplash && <SplashScreen name="Sweetha Muniraj" durationMs={1500} />}
    </>
  );
}