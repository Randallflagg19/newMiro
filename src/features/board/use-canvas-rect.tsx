import { useState, type RefCallback, useCallback, useRef } from "react";

type CanvasRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const useCanvasRect = () => {
  const [canvasRect, setCanvasRect] = useState<CanvasRect>();
  const observerRef = useRef<ResizeObserver | null>(null);

  const canvasRef: RefCallback<HTMLDivElement> = useCallback((el) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!el) return;

    observerRef.current = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const { x, y } = entry.target.getBoundingClientRect();
      setCanvasRect({ x, y, width, height });
    });

    observerRef.current.observe(el);
  }, []);

  return { canvasRef, canvasRect };
};
