"use client";

import { Milestone } from "@/components/timeline-components/timeline-types.ts";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

interface MilestoneChangeProps {
  milestoneData: Milestone;
  onMilestoneClose: () => void;
  onMilestoneSubmit: (newMilestoneData: Milestone) => void;
}

const MilestoneChange = ({
  milestoneData,
  onMilestoneClose,
  onMilestoneSubmit,
}: MilestoneChangeProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [milestone, setMilestone] = useState<Milestone>(milestoneData);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMilestone((prevState) => {
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  const onSubmitButtonClick = () => {
    onMilestoneSubmit(milestone);
    onMilestoneClose();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        onMilestoneClose();
        setOpen(e);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Milestone</DialogTitle>
        </DialogHeader>
        <p>{milestone.name}</p>
        <input type={"text"} value={milestone.name} onChange={onNameChange} />
        <Button onClick={onSubmitButtonClick}>Save</Button>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneChange;
