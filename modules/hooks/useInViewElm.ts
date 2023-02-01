import { useEffect, useRef, useState } from "react";
import { useScrolllPosition } from "./useScrollPosition";

export const useInviewElement = (elmIds: string[]) => {
  const [inViewId, setInViewId] = useState("");

  const [{ scrollY }] = useScrolllPosition();
  const itemPositionsRef = useRef<{ y: number; id: string }[]>([]);

  useEffect(() => {
    const inViewItem = itemPositionsRef.current.find((item) => {
      if (item.y < scrollY + window.innerHeight / 2) return true;
      return false;
    });

    setInViewId(inViewItem?.id || "");
  }, [scrollY]);

  useEffect(() => {
    if (elmIds.length === 0) return;

    const itemPositions = elmIds.map((elmId) => {
      const elm = document.getElementById(elmId);
      const y = elm?.offsetTop || 0;
      return { y, id: elmId };
    });

    const itemPositionsReversed = itemPositions.reverse();

    itemPositionsRef.current = itemPositionsReversed;
  }, [elmIds]);

  return [inViewId];
};
