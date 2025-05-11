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
import { Label } from "@/components/ui/label.tsx";

interface DatePickerProps {
  label: string;
  dateValue: undefined | Date;
  onSelectDate: (date: Date) => void;
  disabled?: boolean;
}

const DatePicker = ({
  label,
  dateValue,
  onSelectDate,
  disabled = false,
}: DatePickerProps) => {
  return (
    <div className={"flex flex-col gap-2"}>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-54 justify-start text-left font-normal",
              dateValue && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue ? format(dateValue, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateValue ?? undefined}
            onSelect={(e) => {
              if (e) onSelectDate(e);
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
