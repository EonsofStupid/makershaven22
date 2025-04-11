
import { useEffect, useState } from "react";
import { UI_BREAKPOINTS } from "../shared/constants/app-constants";

/**
 * Hook to detect if the screen is mobile-sized
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < UI_BREAKPOINTS.MD);
    };

    // Check on initial load
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
