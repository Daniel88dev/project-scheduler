import { useState } from "react";
import "./App.css";
import {
  Milestone,
  MilestoneEvent,
  TimelineData,
} from "@/components/timeline/timeline-types.ts";
import Timeline from "@/components/timeline/Timeline.tsx";
import MilestoneChange from "@/components/timeline/MilestoneChange.tsx";
import ModifyTimelineData from "@/components/timeline/ModifyTimelineData.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

function App() {
  const [timelineData, setTimelineData] = useState<TimelineData>({
    title: "Schedule",
    startDate: new Date(2024, 11, 22),
    endDate: new Date(2027, 0, 25),
    milestones: [
      {
        id: 1,
        name: "PR",
        date: new Date(2025, 0, 15),
        type: "circle",
        status: "completed",
        secondaryPosition: "default",
      },
      {
        id: 2,
        name: "PO",
        date: new Date(2025, 3, 15),
        type: "circle",
        status: "completed",
        secondaryPosition: "default",
      },
      {
        id: 3,
        name: "Design",
        date: new Date(2025, 4, 15),
        type: "circle",
        status: "completed",
        secondaryPosition: "title",
      },
      {
        id: 4,
        name: "Manufacturing",
        date: new Date(2025, 5, 15),
        type: "circle",
        status: "pending",
        secondaryPosition: "default",
      },
      {
        id: 5,
        name: "OLT",
        date: new Date(2025, 7, 18),
        type: "square",
        status: "pending",
        secondaryPosition: "default",
      },
      {
        id: 6,
        name: "empty",
        date: new Date(2025, 8, 12),
        type: "circle",
        status: "pending",
        secondaryPosition: "date",
      },
      {
        id: 7,
        name: "Shipping",
        date: new Date(2025, 11, 10),
        type: "circle",
        status: "pending",
        secondaryPosition: "default",
      },
      {
        id: 8,
        name: "Install",
        date: new Date(2025, 11, 25),
        type: "square",
        status: "pending",
        secondaryPosition: "both",
      },
      {
        id: 9,
        name: "Event 1",
        date: new Date(2026, 5, 15),
        type: "triangle",
        status: "pending",
        secondaryPosition: "default",
      },
      {
        id: 10,
        name: "Event 2",
        date: new Date(2026, 7, 15),
        type: "triangle",
        status: "pending",
        secondaryPosition: "default",
      },
      {
        id: 11,
        name: "Event 3",
        date: new Date(2026, 10, 1),
        type: "circle",
        status: "pending",
        secondaryPosition: "default",
      },
      {
        id: 12,
        name: "SOP",
        date: new Date(2026, 11, 15),
        type: "flag",
        status: "pending",
        secondaryPosition: "default",
      },
    ],
  });
  const [milestoneChange, setMilestoneChange] = useState<Milestone | null>(
    null
  );

  const onMilestoneDialogClose = () => {
    setMilestoneChange(null);
  };

  const onMilestoneChangeSubmit = (
    newMilestoneData: Milestone | MilestoneEvent
  ) => {
    setTimelineData((prevState) => {
      const newMilestoneArray: Array<Milestone | MilestoneEvent> =
        prevState.milestones.map((milestone) => {
          if (milestone.id === newMilestoneData.id) {
            return newMilestoneData;
          } else return milestone;
        });

      return {
        ...prevState,
        milestones: newMilestoneArray,
      };
    });
  };

  const onMilestoneDialogOpen = (milestoneData: Milestone) => {
    setMilestoneChange(milestoneData);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <Card className="max-w-7xl mx-auto">
        <CardContent>
          <CardHeader className={"flex flex-row justify-between"}>
            <CardTitle className="text-3xl font-bold mb-20">
              {timelineData.title}
            </CardTitle>
            <ModifyTimelineData
              initialData={timelineData}
              onSave={(e) => console.log(e)}
            />
          </CardHeader>
          <Timeline
            data={timelineData}
            onMilestoneClick={onMilestoneDialogOpen}
          />
        </CardContent>
      </Card>
      {milestoneChange && (
        <MilestoneChange
          milestoneData={milestoneChange}
          onMilestoneClose={onMilestoneDialogClose}
          onMilestoneSubmit={onMilestoneChangeSubmit}
        />
      )}
    </main>
  );
}

export default App;
