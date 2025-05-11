"use client";

import {
  Milestone,
  MilestoneEvent,
  milestonePositions,
  MilestonePositionType,
  milestoneSchema,
  milestoneStatusList,
  MilestoneStatusType,
  milestonesTypeList,
  MilestoneType,
} from "@/components/timeline/timeline-types.ts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import DatePicker from "@/components/DatePicker/DatePicker.tsx";

interface MilestoneChangeProps {
  milestoneData: Milestone | MilestoneEvent;
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
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        onMilestoneClose();
        setOpen(e);
      }}
    >
      <DialogContent
        aria-description={"Dialog to adjust data for selected milestone"}
        aria-describedby={"dialog-description"}
        aria-labelledby={"dialog-title"}
      >
        <DialogHeader>
          <DialogTitle>Change Milestone</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {/*Name input field*/}
          <form.Field
            name={"name"}
            children={(field) => {
              return (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>Enter Milestone Name</Label>
                  <Input
                    id={field.name}
                    type={"text"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete={"off"}
                  />
                  {!field.state.meta.isValid &&
                    field.state.meta.errors.length > 0 && (
                      <em role="alert" className={"text-destructive"}>
                        {field.state.meta.errors
                          .map((error) => error!.message)
                          .join(", ")}
                      </em>
                    )}
                </div>
              );
            }}
          />
          {/*Milestone Type input field*/}
          <form.Field
            name={"type"}
            children={(field) => {
              const onValueChange = (value: MilestoneType) => {
                // TODO: Need to make sure, endDate will set to null/undefined if event type is selected
                field.handleChange(value);
              };

              return (
                <div className={"flex flex-col gap-2"}>
                  <Label>Select Milestone Type/Symbol:</Label>
                  <Select
                    defaultValue={field.state.value}
                    onValueChange={onValueChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a type"} />
                    </SelectTrigger>
                    <SelectContent>
                      {milestonesTypeList.map((option) => (
                        <SelectItem
                          value={option.name}
                          key={`option-${option.name}`}
                        >
                          <option.icon className={"size-4"} />
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />
          <div className={"flex flex-row gap-4"}>
            {/*Date picker field*/}
            <form.Field
              name={"date"}
              children={(field) => {
                return (
                  <DatePicker
                    dateValue={field.state.value}
                    label={"Select Milestone Date"}
                    onSelectDate={(e) => field.handleChange(e)}
                  />
                );
              }}
            />
            {/*Milestone Event End Date (only if type is event*/}
            <form.Subscribe
              selector={(state) => state.values.type}
              children={(milestoneType) => (
                <form.Field
                  name={"endDate"}
                  children={(field) => {
                    return (
                      <DatePicker
                        dateValue={field.state.value}
                        label={"Select Milestone Event End Date"}
                        onSelectDate={(e) => field.handleChange(e)}
                        disabled={milestoneType !== "event"}
                      />
                    );
                  }}
                />
              )}
            />
          </div>
          {/*Milestone status select field*/}
          <form.Field
            name={"status"}
            children={(field) => {
              const onValueChange = (value: MilestoneStatusType) => {
                field.handleChange(value);
              };
              return (
                <div className={"flex flex-col gap-2"}>
                  <Label>Select Status for Milestone</Label>
                  <Select
                    defaultValue={field.state.value}
                    onValueChange={onValueChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={"Select a status"} />
                    </SelectTrigger>
                    <SelectContent>
                      {milestoneStatusList.map((status) => (
                        <SelectItem value={status} key={`status-${status}`}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />
          {/*Milestone secondary position select field*/}
          <form.Field
            name={"secondaryPosition"}
            children={(field) => {
              const onValueChange = (value: MilestonePositionType) => {
                field.handleChange(value);
              };

              return (
                <div className={"flex flex-col gap-2"}>
                  <Label>
                    Select which Label should have secondary position:
                  </Label>
                  <Select
                    defaultValue={field.state.value}
                    onValueChange={onValueChange}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          "Which element should have secondary position?"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {milestonePositions.map((position) => (
                        <SelectItem
                          value={position}
                          key={`position-${position}`}
                        >
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />
          <DialogFooter>
            <Button type={"submit"}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneChange;
