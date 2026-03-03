import { useEffect, useState } from "react";
import PixelBlast from "./PixelBlast";

const SM_BREAKPOINT = 640;

export default function HeroBackground() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.innerWidth >= SM_BREAKPOINT;

    if (isDesktop && !prefersReducedMotion) {
      setCanRender(true);
    }
  }, []);

  if (!canRender) return null;

  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <PixelBlast
        variant="square"
        pixelSize={4}
        color="#e83e8c"
        patternScale={2}
        patternDensity={1}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        speed={0.5}
        edgeFade={0.25}
        transparent
      />
    </div>
  );
}
