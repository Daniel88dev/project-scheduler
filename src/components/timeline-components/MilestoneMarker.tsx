"use client";

import { Milestone } from "./timeline-types.ts";
import { Circle, Flag, Square, Triangle } from "lucide-react";
import { cn } from "@/lib/utils.ts";

interface MilestoneMarkerProps {
  milestone: Milestone;
  onMilestoneClick: (milestone: Milestone) => void;
}

const MilestoneMarker = ({
  milestone,
  onMilestoneClick,
}: MilestoneMarkerProps) => {
  const formatMilestone = () => {
    const today = new Date();
    if (milestone.date < today && milestone.status === "completed") {
      return "fill-blue-400";
    } else if (milestone.date < today) {
      return "fill-red-400";
    } else {
      return "fill-secondary";
    }
  };

  const getMarkerIcon = () => {
    switch (milestone.type) {
      case "circle":
        return (
          <Circle className={cn("h-6 w-6 text-blue-600", formatMilestone())} />
        );
      case "square":
        return (
          <Square className={cn("h-6 w-6 text-blue-600", formatMilestone())} />
        );
      case "triangle":
        return (
          <Triangle
            className={cn("h-6 w-6 text-blue-600", formatMilestone())}
          />
        );
      case "end":
        return (
          <Flag className={cn("h-6 w-6 text-blue-600", formatMilestone())} />
        );
      default:
        return (
          <Circle className={cn("h-6 w-6 text-blue-600", formatMilestone())} />
        );
    }
  };

  return (
    <div className="flex flex-col items-center cursor-pointer -translate-x-1/2">
      {/* Name above */}
      <div className="text-xs text-black font-medium mb-1 whitespace-nowrap">
        {milestone.name}
      </div>

      {/* Marker */}
      <div
        className="flex items-center justify-center"
        onClick={() => onMilestoneClick(milestone)}
      >
        {getMarkerIcon()}
      </div>

      {/* Date */}
      <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
        {milestone.date.getMonth() + 1}/{milestone.date.getDate()}
        {/*{milestone.date.toLocaleDateString("en-US", {*/}
        {/*  month: "short",*/}
        {/*  day: "numeric",*/}
        {/*  year: "numeric",*/}
        {/*})}*/}
      </div>
    </div>
  );
};

export default MilestoneMarker;
