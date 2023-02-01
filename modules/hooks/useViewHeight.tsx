import { useEffect, useState } from "react";

export const useViewHeight = () => {
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    const _viewHeight = Math.min(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    setViewHeight(_viewHeight);
  }, [null]);

  return [viewHeight];
};
