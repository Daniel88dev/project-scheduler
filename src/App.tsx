import { useState } from "react";
import "./App.css";
import { TimelineData } from "./types.ts";
import Timeline from "./Timeline.tsx";

function App() {
  const [timelineData, setTimelineData] = useState<TimelineData>({
    title: "Schedule",
    startDate: new Date(2025, 0, 22),
    endDate: new Date(2027, 0, 25),
    milestones: [
      {
        id: 1,
        name: "PR",
        date: new Date(2025, 0, 15),
        type: "circle",
        status: "completed",
      },
      {
        id: 2,
        name: "PO",
        date: new Date(2025, 3, 15),
        type: "circle",
        status: "completed",
      },
      {
        id: 3,
        name: "Design",
        date: new Date(2025, 4, 15),
        type: "circle",
        status: "completed",
      },
      {
        id: 4,
        name: "Manufacturing",
        date: new Date(2025, 5, 15),
        type: "circle",
        status: "pending",
      },
      {
        id: 5,
        name: "OLT",
        date: new Date(2025, 7, 18),
        type: "square",
        status: "pending",
      },
      {
        id: 6,
        name: "empty",
        date: new Date(2025, 8, 12),
        type: "circle",
        status: "pending",
      },
      {
        id: 7,
        name: "Shipping",
        date: new Date(2025, 11, 10),
        type: "circle",
        status: "pending",
      },
      {
        id: 8,
        name: "install",
        date: new Date(2025, 11, 25),
        type: "square",
        status: "pending",
        connector: "line",
      },
      {
        id: 9,
        name: "Event 1",
        date: new Date(2026, 5, 15),
        type: "triangle",
        status: "pending",
      },
      {
        id: 10,
        name: "Event 2",
        date: new Date(2026, 7, 15),
        type: "triangle",
        status: "pending",
      },
      {
        id: 11,
        name: "Event 3",
        date: new Date(2026, 10, 1),
        type: "circle",
        status: "pending",
      },
      {
        id: 12,
        name: "SOP",
        date: new Date(2026, 11, 15),
        type: "end",
        status: "pending",
      },
    ],
  });

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{timelineData.title}</h1>
        <Timeline data={timelineData} />
      </div>
    </main>
  );
}

export default App;
