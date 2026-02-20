"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
    date?: Date;
    setDate: (date?: Date) => void;
    label?: string;
    placeholder?: string;
}

export function DatePicker({ date, setDate, label, placeholder = "Pick a date" }: DatePickerProps) {
    return (
        <div className="space-y-2">
            {label && <Label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] ml-1">{label}</Label>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full h-14 bg-white/5 border-white/10 rounded-2xl pl-12 justify-start text-left font-normal text-white hover:bg-white/10 hover:border-pink-500/50 transition-all",
                            !date && "text-neutral-500"
                        )}
                    >
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        {date ? format(date, "PPP") : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-neutral-900 border-white/10" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="bg-neutral-900 text-white rounded-xl border-none p-3"
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
