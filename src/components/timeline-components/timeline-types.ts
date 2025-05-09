import { z } from "zod";
import { Circle, Flag, Square, Triangle } from "lucide-react";

export const milestonesTypeList = [
  { name: "circle", icon: Circle },
  { name: "square", icon: Square },
  { name: "triangle", icon: Triangle },
  { name: "flag", icon: Flag },
] as const;

export const milestoneStatusList = ["active", "pending", "completed"] as const;

export const milestonePositions = ["title", "date", "both", "default"] as const;

export type MilestoneType = (typeof milestonesTypeList)[number]["name"];

export type MilestoneStatusType = (typeof milestoneStatusList)[number];

export type MilestonePositionType = (typeof milestonePositions)[number];

export interface Milestone {
  id: number;
  name: string;
  date: Date;
  type: MilestoneType;
  status: MilestoneStatusType;
  secondaryPosition: MilestonePositionType;
}

export interface TimelineData {
  title: string;
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
}

export const milestoneSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Minimum length is 2 characters"),
  date: z.date(),
  type: z.enum(["circle", "square", "triangle", "flag"]),
  status: z.enum(milestoneStatusList),
  secondaryPosition: z.enum(milestonePositions),
});
