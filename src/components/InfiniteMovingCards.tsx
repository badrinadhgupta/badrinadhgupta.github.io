"use client";

import { cn } from "../utils";
import React, { useEffect, useState } from "react";
import { WorkItem } from "../data/workData";
import { WorkCard } from "./WorkSection";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: WorkItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);
  
  const [start, setStart] = useState(false);
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "10s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      }
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const speedValue = speed === "fast" ? "10s" : speed === "normal" ? "20s" : "30s";
  const animationDirection = direction === "left" ? "forwards" : "reverse";
  
  // Instead of using shorthand, break it into individual properties
  const animationStyle = {
    animationName: "scroll",
    animationDuration: speedValue,
    animationDirection: animationDirection,
    animationTimingFunction: "linear", 
    animationIterationCount: "infinite",
    animationPlayState: isPaused ? "paused" : "running"
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className="flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 card-container"
        style={animationStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((project, idx) => (
          <li
            className="relative flex-shrink-0 px-1 w-[280px] sm:w-[320px] md:w-[350px]"
            key={`${project.id}-${idx}`}
          >
            <WorkCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}; 