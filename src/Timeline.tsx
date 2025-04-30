"use client";

import { Milestone, TimelineData } from "./types.ts";
import { useEffect, useRef, useState } from "react";

interface TimelineProps {
  data: TimelineData;
}

const Timeline = ({ data }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(0);

  useEffect(() => {
    if (timelineRef.current) {
      setTimelineWidth(timelineRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (timelineRef.current) {
        setTimelineWidth(timelineRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalDays = Math.ceil(
    (data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const today = new Date();

  const daysUntilToday = Math.max(
    0,
    Math.min(
      totalDays,
      Math.ceil(
        (today.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    )
  );

  const todayPosition = (daysUntilToday / totalDays) * 100;
};

export default Timeline;
