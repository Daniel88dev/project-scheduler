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
  connector?: "line";
}

export interface TimelineData {
  title: string;
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
}
