import { useEffect, useState } from "react";

export const useScrolllPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
  });

  const onScroll = (e: any) => {
    setScrollPosition({ scrollY: window.scrollY, scrollX: window.scrollX });
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [null]);

  return [scrollPosition];
};
