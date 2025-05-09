"use client";

import {
  Milestone,
  milestoneSchema,
} from "@/components/timeline-components/timeline-types.ts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useForm } from "@tanstack/react-form";

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

  const form = useForm({
    defaultValues: milestoneData,
    validators: {
      onChangeAsync: milestoneSchema,
      onChangeAsyncDebounceMs: 500,
    },
    onSubmit: ({ value }) => {
      onMilestoneSubmit(value);
      onMilestoneClose();
      setOpen(false);
    },
    // onSubmitError: (errors) => {
    //   console.log(errors);
    // },
    // onSubmitSuccess: (values) => {
  });
  //
  // const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setMilestone((prevState) => {
  //     return {
  //       ...prevState,
  //       name: e.target.value,
  //     };
  //   });
  // };
  //
  // const onSubmitButtonClick = () => {
  //   onMilestoneSubmit(milestone);
  //   onMilestoneClose();
  //   setOpen(false);
  // };

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
        <form onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        {/*<p>{milestone.name}</p>*/}
        {/*<input type={"text"} value={milestone.name} onChange={onNameChange} />*/}
        {/*<Button onClick={onSubmitButtonClick}>Save</Button>*/}
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneChange;
