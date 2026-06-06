"use client";

import {
  FC,
  PointerEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "",
  speed = 1,
  className = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  const uid = useId();

  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0";
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const directionRef = useRef<"left" | "right">(direction);
  const offsetRef = useRef(0);

  const [spacing, setSpacing] = useState(0);
  const [ready, setReady] = useState(false);

  const pathId = `curve-${uid}`;

  const pathD = `M -100 40 Q 720 ${40 + curveAmount} 1540 40`;

  useEffect(() => {
    let mounted = true;

    const measure = async () => {
      try {
        if ("fonts" in document) {
          await document.fonts.ready;
        }

        if (!mounted || !measureRef.current) return;

        const width = measureRef.current.getComputedTextLength();

        if (width > 0) {
          setSpacing(width);
          offsetRef.current = -width;
          setReady(true);
        }
      } catch {
        if (!mounted || !measureRef.current) return;

        const width = measureRef.current.getComputedTextLength();

        if (width > 0) {
          setSpacing(width);
          offsetRef.current = -width;
          setReady(true);
        }
      }
    };

    measure();

    return () => {
      mounted = false;
    };
  }, [text]);

  const repeatedText = useMemo(() => {
    if (!spacing) return text;

    return Array(Math.ceil(2000 / spacing) + 3)
      .fill(text)
      .join("");
  }, [spacing, text]);

  useEffect(() => {
    if (!ready || !spacing || !textPathRef.current) return;

    textPathRef.current.setAttribute(
      "startOffset",
      `${offsetRef.current}px`
    );

    let animationFrame: number;

    const animate = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta =
          directionRef.current === "right" ? speed : -speed;

        let nextOffset = offsetRef.current + delta;

        while (nextOffset <= -spacing) {
          nextOffset += spacing;
        }

        while (nextOffset > 0) {
          nextOffset -= spacing;
        }

        offsetRef.current = nextOffset;

        textPathRef.current.setAttribute(
          "startOffset",
          `${nextOffset}px`
        );
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [ready, spacing, speed]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;

    dragRef.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (
      !interactive ||
      !dragRef.current ||
      !textPathRef.current ||
      !spacing
    ) {
      return;
    }

    const dx = e.clientX - lastXRef.current;

    lastXRef.current = e.clientX;
    velocityRef.current = dx;

    let nextOffset = offsetRef.current + dx;

    while (nextOffset <= -spacing) {
      nextOffset += spacing;
    }

    while (nextOffset > 0) {
      nextOffset -= spacing;
    }

    offsetRef.current = nextOffset;

    textPathRef.current.setAttribute(
      "startOffset",
      `${nextOffset}px`
    );
  };

  const endDrag = () => {
    if (!interactive) return;

    dragRef.current = false;

    if (velocityRef.current > 0) {
      directionRef.current = "right";
    } else if (velocityRef.current < 0) {
      directionRef.current = "left";
    }
  };

  return (
    <div
      className="w-full  overflow-hidden mb-0 leading-none"
      style={{
        cursor: interactive
          ? dragRef.current
            ? "grabbing"
            : "grab"
          : "auto",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        viewBox="0 0 1440 120"
  className="block w-full overflow-visible select-none h-auto"
  preserveAspectRatio="xMidYMid meet"
      >
        <text
          ref={measureRef}
          style={{
            visibility: "hidden",
            position: "absolute",
            pointerEvents: "none",
          }}
          className={`text-[3rem] font-bold uppercase ${className}`}
        >
          {text}
        </text>

        <defs>
          <path id={pathId} d={pathD} />
        </defs>

        {ready && (
          <text
            className={`fill-current text-gray-800 font-bold uppercase text-[2rem] sm:text-[4rem] md:text-[2rem] ${className}`}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={`${offsetRef.current}px`}
            >
              {repeatedText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;