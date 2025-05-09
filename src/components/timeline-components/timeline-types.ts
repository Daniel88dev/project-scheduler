import { z } from "zod";

export type MilestoneType =
  | "circle-filled"
  | "circle"
  | "square"
  | "triangle"
  | "end";

export type MilestoneStatus = "active" | "pending" | "completed";

export interface Milestone {
  id: number;
  name: string;
  date: Date;
  type: MilestoneType;
  status: MilestoneStatus;
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
  type: z.enum(["circle-filled", "circle", "square", "triangle", "end"]),
  status: z.enum(["active", "pending", "completed"]),
  secondaryPosition: z.enum(["title", "date", "both", "default"]),
});
