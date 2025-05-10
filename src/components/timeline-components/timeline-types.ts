import { z } from "zod";
import { Circle, Flag, Square, Triangle } from "lucide-react";

export const milestonesTypeList = [
  { name: "circle", icon: Circle },
  { name: "square", icon: Square },
  { name: "triangle", icon: Triangle },
  { name: "flag", icon: Flag },
] as const;

export type MilestoneType = (typeof milestonesTypeList)[number]["name"];

export type MilestoneStatusType = "active" | "pending" | "completed";

export interface Milestone {
  id: number;
  name: string;
  date: Date;
  type: MilestoneType;
  status: MilestoneStatusType;
  secondaryPosition?: "title" | "date" | "both" | "default";
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
  status: z.enum(["active", "pending", "completed"]),
  secondaryPosition: z.enum(["title", "date", "both", "default"]),
});
