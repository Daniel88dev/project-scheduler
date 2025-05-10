"use client";

import {
  Milestone,
  milestoneSchema,
  milestonesTypeList,
  MilestoneType,
} from "@/components/timeline-components/timeline-types.ts";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

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
  });

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
                  <Label htmlFor={field.name}>Enter Milestone Name:</Label>
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
          {/*Date picker field*/}
          <form.Field
            name={"date"}
            children={(field) => {
              return (
                <div className="flex flex-col gap-2">
                  <Label>Select Milestone Date:</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
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
                        selected={field.state.value}
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
            name={"type"}
            children={(field) => {
              const onValueChange = (value: MilestoneType) => {
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
                        <SelectItem value={option.name} key={option.name}>
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneChange;
