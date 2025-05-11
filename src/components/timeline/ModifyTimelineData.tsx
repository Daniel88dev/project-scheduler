"use client";

import { TimelineData, timelineEditSchema } from "./timeline-types.ts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-dialog.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";

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
      if (
        value.startDate !== null &&
        value.startDate instanceof Date &&
        value.endDate !== null &&
        value.endDate instanceof Date &&
        value.startDate < value.endDate &&
        value.title.length > 4
      ) {
        // TODO: fix date error type
        onSave(value);
        setOpen(false);
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
                  <div className="flex flex-col gap-2">
                    <Label>Select Timeline Start Date:</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-54 justify-start text-left font-normal",
                            !field.state.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.state.value ? (
                            format(field.state.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.state.value ?? undefined}
                          onSelect={(e) => {
                            if (e) field.handleChange(e);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              }}
            />
            <form.Field
              name={"endDate"}
              children={(field) => {
                return (
                  <div className="flex flex-col gap-2">
                    <Label>Select Timeline End Date:</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-54 justify-start text-left font-normal",
                            !field.state.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.state.value ? (
                            format(field.state.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.state.value ?? undefined}
                          onSelect={(e) => {
                            if (e) field.handleChange(e);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                );
              }}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyTimelineData;
