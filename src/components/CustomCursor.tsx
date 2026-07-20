import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export function CustomCursor() {
  const { dictionary } = useLanguage();
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hasPointerPosition, setHasPointerPosition] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canUseCursor = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canUseCursor && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setHasPointerPosition(true);
      const target = event.target instanceof Element ? event.target : null;
      setActive(Boolean(target?.closest("[data-cursor='view']")));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled || !hasPointerPosition) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${active ? "custom-cursor--active" : ""}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      aria-hidden="true"
    >
      <span>{dictionary.actions.viewLabel}</span>
    </div>
  );
}
