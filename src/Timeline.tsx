"use client";

import { Milestone, TimelineData } from "./types.ts";
import { useEffect, useRef, useState } from "react";
import MilestoneMarker from "./MilestoneMarker.tsx";

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

  const getPositionForDate = (date: Date) => {
    const days = Math.ceil(
      (date.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, Math.min(100, (days / totalDays) * 100));
  };

  return (
    <div className="mb-16">
      <div className="relative mb-12" ref={timelineRef}>
        {/* Main timeline line */}
        <div className="h-1 bg-gray-300 w-full rounded-full"></div>

        {/* Blue line until today */}
        <div
          className="h-2 bg-blue-500 rounded-full absolute top-1/2 left-0 -translate-y-1/2"
          style={{ width: `${todayPosition}%` }}
        ></div>

        {/* Milestones */}
        {data.milestones.map((milestone) => {
          const position = getPositionForDate(milestone.date);

          return (
            <div
              key={milestone.id}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${position}%` }}
            >
              {/*milestone component*/}
              <MilestoneMarker milestone={milestone} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
