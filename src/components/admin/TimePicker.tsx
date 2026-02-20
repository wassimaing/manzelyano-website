"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export function TimePicker({ value, onChange, label }: TimePickerProps) {
    // value is "HH:MM AM/PM" or similar
    const [timeStr, period] = value.split(" ");
    const [hours, minutes] = timeStr ? timeStr.split(":") : ["12", "00"];
    const currentPeriod = period || "AM";

    const updateTime = (h: string, m: string, p: string) => {
        onChange(`${h}:${m} ${p}`);
    };

    const hoursOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutesOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    return (
        <div className="space-y-2">
            {label && <Label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] ml-1">{label}</Label>}
            <div className="flex gap-2">
                <Select value={hours} onValueChange={(v) => updateTime(v, minutes, currentPeriod)}>
                    <SelectTrigger className="w-[70px] bg-white/5 border-white/10 rounded-xl focus:ring-pink-500/50">
                        <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/10 text-white">
                        {hoursOptions.map(h => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={minutes} onValueChange={(v) => updateTime(hours, v, currentPeriod)}>
                    <SelectTrigger className="w-[70px] bg-white/5 border-white/10 rounded-xl focus:ring-pink-500/50">
                        <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/10 text-white">
                        {minutesOptions.map(m => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={currentPeriod} onValueChange={(v) => updateTime(hours, minutes, v)}>
                    <SelectTrigger className="w-[80px] bg-white/5 border-white/10 rounded-xl focus:ring-pink-500/50">
                        <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-white/10 text-white">
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
