"use client";

import { TimelineData, timelineEditSchema } from "./timeline-types.ts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

import { isDate } from "date-fns";
import DatePicker from "@/components/DatePicker/DatePicker.tsx";

type ShortenedTimelineType = Omit<TimelineData, "milestones">;

interface ModifyTimeLineDataProps {
  initialData?: ShortenedTimelineType;
  onSave: (data: ShortenedTimelineType) => void;
}

const ModifyTimelineData = ({
  initialData,
  onSave,
}: ModifyTimeLineDataProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      title: initialData?.title ?? "",
      startDate: initialData?.startDate ?? null,
      endDate: initialData?.endDate ?? null,
    },
    validators: {
      onChangeAsync: timelineEditSchema,
      onChangeAsyncDebounceMs: 500,
    },
    onSubmit: ({ value }) => {
      const startDate = value.startDate;
      const endDate = value.endDate;
      if (isDate(startDate) && isDate(endDate)) {
        onSave({ ...value, startDate, endDate });
        setOpen(false);
      } else {
        alert("Please select valid dates");
      }
    },
  });

  console.log(typeof form.state.values.startDate);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Edit Timeline data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Timeline</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await form.handleSubmit(e);
          }}
          className="flex flex-col gap-4"
        >
          <form.Field
            name={"title"}
            children={(field) => {
              return (
                <div className={"flex flex-col gap-2"}>
                  <Label htmlFor={field.name}>Title</Label>
                  <Input
                    id={field.name}
                    type={"text"}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    autoComplete={"off"}
                  />
                </div>
              );
            }}
          />
          <div className={"flex flex-row gap-4"}>
            <form.Field
              name={"startDate"}
              children={(field) => {
                return (
                  <DatePicker
                    dateValue={field.state.value ?? undefined}
                    label={"Select Timeline Start Date"}
                    onSelectDate={(e) => field.handleChange(e)}
                  />
                );
              }}
            />
            <form.Field
              name={"endDate"}
              children={(field) => {
                return (
                  <DatePicker
                    dateValue={field.state.value ?? undefined}
                    label={"Select Timeline End Date"}
                    onSelectDate={(e) => field.handleChange(e)}
                  />
                );
              }}
            />
          </div>
          <DialogFooter>
            <Button type={"submit"}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyTimelineData;
