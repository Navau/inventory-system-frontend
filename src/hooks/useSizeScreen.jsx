import React from "react";
import { useMediaQuery } from "react-responsive";

export function useSizeScreen() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLittleMobile = useMediaQuery({
    query: "(min-width: 280px) and (max-width: 360px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return {
    isDesktopOrLaptop,
    isLittleMobile,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isRetina,
  };
}
