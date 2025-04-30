"use client";

import { Milestone } from "./types.ts";
import { Circle, Flag, Square, Triangle } from "lucide-react";

interface MilestoneMarkerProps {
  milestone: Milestone;
}

const MilestoneMarker = ({ milestone }: MilestoneMarkerProps) => {
  const getMarkerIcon = () => {
    switch (milestone.type) {
      case "circle":
        return <Circle className="h-6 w-6 text-blue-600" />;
      case "square":
        return <Square className="h-6 w-6 text-blue-600" />;
      case "triangle":
        return <Triangle className="h-6 w-6 text-blue-600" />;
      case "end":
        return <Flag className="h-6 w-6 text-blue-600" />;
      default:
        return <Circle className="h-6 w-6 text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col items-center cursor-pointer -translate-x-1/2">
      {/* Name above */}
      <div className="text-xs text-black font-medium mb-1 whitespace-nowrap">
        {milestone.name}
      </div>

      {/* Marker */}
      <div className="flex items-center justify-center">{getMarkerIcon()}</div>

      {/* Date */}
      <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
        {milestone.date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </div>
  );
};

export default MilestoneMarker;
