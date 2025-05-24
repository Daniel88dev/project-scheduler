import { z } from "zod";
import { Circle, Flag, Square, Triangle } from "lucide-react";

export const milestonesTypeList = [
  { name: "circle", icon: Circle },
  { name: "square", icon: Square },
  { name: "triangle", icon: Triangle },
  { name: "flag", icon: Flag },
  { name: "event", icon: Square },
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
  type: "circle" | "square" | "triangle" | "flag" | "event";
  status: MilestoneStatusType;
  secondaryPosition: MilestonePositionType;
}

export interface MilestoneEvent extends Milestone {
  endDate: Date;
  type: "event";
}

export interface TimelineData {
  title: string;
  startDate: Date;
  endDate: Date;
  milestones: Array<Milestone | MilestoneEvent>;
}

export const milestoneSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Minimum length is 2 characters"),
  date: z.date(),
  type: z.enum(["circle", "square", "triangle", "flag"]),
  status: z.enum(milestoneStatusList),
  secondaryPosition: z.enum(milestonePositions),
  endDate: z.date().nullable().optional(),
});

export const timelineEditSchema = z.object({
  title: z.string().min(5, "Minimum length is 5 characters"),
  startDate: z.date(),
  endDate: z.date(),
});
