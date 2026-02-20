"use client";

import { useState, useEffect } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/data";
import { Event } from "@/data/events";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Save,
    Calendar as CalendarIcon,
    MapPin,
    Type,
    CheckCircle2,
    AlertCircle,
    Clock,
    Layers,
    Navigation2
} from "lucide-react";
import { ImageUpload, MultiImageUpload } from "@/components/admin/ImageUpload";
import { TimePicker } from "@/components/admin/TimePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { DatePicker } from "@/components/admin/DatePicker";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { format, differenceInDays, parseISO } from "date-fns";
import { ConfirmationDialog } from "@/components/admin/ConfirmationDialog";

const CATEGORIES = ["Community", "Social", "Sports", "Education", "Workshop"];

export default function EventsManagement() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState<Omit<Event, 'id'>>({
        title: "",
        date: "",
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
        location: "",
        image: "",
        category: "Community",
        color: "blue",
        overview: "",
        durationDays: 1,
        timeline: [],
        gallery: []
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm?: () => void;
        variant: 'danger' | 'warning' | 'info' | 'success';
        type: 'confirm' | 'alert';
    }>({
        isOpen: false,
        title: "",
        message: "",
        variant: 'info',
        type: 'confirm'
    });
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (event?: Event) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                date: event.date,
                startDate: event.startDate || format(new Date(), "yyyy-MM-dd"),
                endDate: event.endDate || format(new Date(), "yyyy-MM-dd"),
                location: event.location,
                image: event.image,
                category: event.category,
                color: event.color,
                overview: event.overview,
                durationDays: event.durationDays || 1,
                timeline: event.timeline || [],
                gallery: event.gallery || []
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: "",
                date: "",
                startDate: format(new Date(), "yyyy-MM-dd"),
                endDate: format(new Date(), "yyyy-MM-dd"),
                location: "",
                image: "",
                category: "Community",
                color: "blue",
                overview: "",
                durationDays: 1,
                timeline: [],
                gallery: []
            });
        }
        setIsModalOpen(true);
    };

    const calculateDurationAndFormatDate = (startStr: string, endStr: string) => {
        const start = parseISO(startStr);
        const end = parseISO(endStr);

        const duration = differenceInDays(end, start) + 1;
        const finalDuration = duration > 0 ? duration : 1;

        let displayDate = "";
        if (finalDuration === 1) {
            displayDate = format(start, "MMMM dd, yyyy");
        } else {
            displayDate = `FROM ${format(start, "MMMM dd")} TO ${format(end, "dd, yyyy")}`;
        }

        return { finalDuration, displayDate };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        // Date Validation
        if (parseISO(formData.endDate) < parseISO(formData.startDate)) {
            const errorMsg = "End Date cannot be before Start Date!";
            setMessage({ type: 'error', text: errorMsg });
            setConfirmDialog({
                isOpen: true,
                title: "Invalid Timeline",
                message: errorMsg,
                variant: 'warning',
                type: 'alert'
            });
            return;
        }

        const { finalDuration, displayDate } = calculateDurationAndFormatDate(formData.startDate, formData.endDate);
        const finalData = { ...formData, durationDays: finalDuration, date: displayDate };

        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, finalData);
                setMessage({ type: 'success', text: 'Event updated successfully!' });
            } else {
                await createEvent(finalData);
                setMessage({ type: 'success', text: 'Event created successfully!' });
            }
            fetchEvents();
            setTimeout(() => setIsModalOpen(false), 1500);
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Operation failed. Please try again.' });
            console.error("Error saving event:", error.message || error, error);
        }
    };

    const handleDelete = async (id: string) => {
        setConfirmDialog({
            isOpen: true,
            title: "Delete Event?",
            message: "This action cannot be undone. Are you sure you want to proceed?",
            variant: 'danger',
            type: 'confirm',
            onConfirm: async () => {
                try {
                    await deleteEvent(id);
                    setEvents(events.filter(e => e.id !== id));
                    setMessage({ type: 'success', text: 'Event deleted successfully.' });
                } catch (error) {
                    console.error("Error deleting event:", error);
                    setMessage({ type: 'error', text: 'Failed to delete event.' });
                }
            }
        });
    };

    const addTimelineItem = () => {
        setFormData({
            ...formData,
            timeline: [...(formData.timeline || []), { time: "08:00 AM", activity: "" }]
        });
    };

    const updateTimelineItem = (index: number, field: 'time' | 'activity', value: string) => {
        const newTimeline = [...(formData.timeline || [])];
        newTimeline[index] = { ...newTimeline[index], [field]: value };
        setFormData({ ...formData, timeline: newTimeline });
    };

    const removeTimelineItem = (index: number) => {
        setFormData({
            ...formData,
            timeline: (formData.timeline || []).filter((_, i) => i !== index)
        });
    };

    return (
        <div className="space-y-8 pb-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground uppercase tracking-tight">Events <span className="text-pink-500">Backend</span></h1>
                    <p className="text-muted-foreground text-sm">Empower your community with seamless organization.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20 active:scale-95"
                >
                    <Plus size={20} />
                    Create Event
                </button>
            </header>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                    type="text"
                    placeholder="Filter by title, location or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-muted border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:border-pink-500/50 transition-all placeholder:text-muted-foreground/60 font-medium"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {events
                        .filter(event =>
                            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.category.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass-panel rounded-[2rem] border border-border overflow-hidden flex flex-col group hover:border-pink-500/30 transition-all duration-500 shadow-xl"
                            >
                                <div className="relative h-48">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-card/60 backdrop-blur-md border border-border text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest">{event.category}</div>
                                    {event.durationDays && event.durationDays > 1 && (
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-pink-500 text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                                            {event.durationDays} Days
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{event.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 h-10">{event.overview}</p>
                                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(event)}
                                                className="w-10 h-10 rounded-xl bg-muted border border-border text-muted-foreground flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                className="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{event.date}</span>
                                            <span className="text-[8px] font-mono text-pink-500/60 uppercase tracking-tighter flex items-center gap-1">
                                                <MapPin size={8} /> {event.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <ResponsiveModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title={`${editingEvent ? "Update" : "Draft"} Event`}
                maxWidth="max-w-6xl"
            >
                <div className="flex-1 p-6 md:p-12 scrollbar-hide">
                    <form id="event-form" onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
                        {/* Section 1: Core Logistics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                            <div className="lg:col-span-1">
                                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4">01. Visuals</h3>
                                <ImageUpload
                                    label="Featured Image"
                                    value={formData.image}
                                    onChange={(url: string) => {
                                        setFormData({ ...formData, image: url });
                                        if (editingEvent) {
                                            updateEvent(editingEvent.id, { image: url }).catch(e => console.error("Auto-save failed:", e));
                                        }
                                    }}
                                />
                            </div>

                            <div className="lg:col-span-2 space-y-6 md:space-y-8">
                                <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4">02. Essentials</h3>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Title</Label>
                                    <div className="relative">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                        <Input
                                            required
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            className="h-14 bg-muted border-border rounded-2xl pl-12 text-foreground focus:ring-pink-500/50"
                                            placeholder="e.g. Innovation Summit 2025"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                    <DatePicker
                                        label="Start Date"
                                        date={formData.startDate ? parseISO(formData.startDate) : undefined}
                                        setDate={(d) => setFormData({ ...formData, startDate: d ? format(d, "yyyy-MM-dd") : "" })}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        date={formData.endDate ? parseISO(formData.endDate) : undefined}
                                        setDate={(d) => setFormData({ ...formData, endDate: d ? format(d, "yyyy-MM-dd") : "" })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Location</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                            <Input
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                className="h-14 bg-muted border-border rounded-2xl pl-12 text-foreground focus:ring-pink-500/50"
                                                placeholder="Menzel Bourguiba"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(v) => setFormData({ ...formData, category: v as any })}
                                        >
                                            <SelectTrigger className="h-14 bg-muted border-border rounded-2xl text-foreground focus:ring-pink-500/50">
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-card border-border text-foreground">
                                                {CATEGORIES.map(cat => (
                                                    <SelectItem key={cat} value={cat} className="hover:bg-pink-500 hover:text-white transition-colors">{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Narrative */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4">03. Narrative</h3>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">About the event</Label>
                                <textarea
                                    rows={5}
                                    value={formData.overview}
                                    onChange={e => setFormData({ ...formData, overview: e.target.value })}
                                    className="w-full bg-muted border border-border rounded-3xl py-6 px-6 text-foreground focus:border-pink-500/50 outline-none transition-all resize-none placeholder:text-muted-foreground/60 font-sans leading-relaxed text-sm"
                                    placeholder="Craft a compelling story for your event..."
                                />
                            </div>
                        </div>

                        {/* Section 3: Timeline */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-[0.3em] mb-1">04. Timeline</h3>
                                    <p className="text-[10px] text-pink-500/50 uppercase tracking-widest font-mono">Add key moments to the schedule.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addTimelineItem}
                                    className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center gap-2"
                                >
                                    <Plus size={14} /> Add Moment
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.timeline?.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-left-4 duration-300">
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 bg-muted/30 p-6 rounded-3xl border border-border shadow-inner">
                                            <div className="md:col-span-1">
                                                <TimePicker
                                                    label="Time"
                                                    value={item.time}
                                                    onChange={(v) => updateTimelineItem(index, 'time', v)}
                                                />
                                            </div>
                                            <div className="md:col-span-3 space-y-2">
                                                <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Activity</Label>
                                                <Input
                                                    value={item.activity}
                                                    onChange={e => updateTimelineItem(index, 'activity', e.target.value)}
                                                    className="h-10 bg-muted border-border rounded-xl text-foreground focus:ring-pink-500/50 text-xs"
                                                    placeholder="e.g. Registration & Networking"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTimelineItem(index)}
                                            className="w-12 h-12 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ))}
                                {(!formData.timeline || formData.timeline.length === 0) && (
                                    <div className="py-12 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-muted-foreground gap-3">
                                        <Clock size={32} />
                                        <p className="text-xs font-mono uppercase tracking-widest">No activities scheduled yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 4: Gallery */}
                        <div className="space-y-8">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-[0.3em] mb-1">05. Gallery</h3>
                                <p className="text-[10px] text-pink-500/50 uppercase tracking-widest font-mono">Showcase the best moments of the event.</p>
                            </div>
                            <MultiImageUpload
                                values={formData.gallery || []}
                                onChange={(urls) => {
                                    setFormData({ ...formData, gallery: urls });
                                    if (editingEvent) {
                                        updateEvent(editingEvent.id, { gallery: urls }).catch(e => console.error("Auto-save failed:", e));
                                    }
                                }}
                            />
                        </div>

                        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                            {message ? (
                                <div className={`flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest ${message.type === 'success' ? 'text-green-500' : 'text-red-500'} animate-in fade-in slide-in-from-left-4`}>
                                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                    {message.text}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em]">
                                    <Layers size={14} className="animate-pulse" /> Finalize changes
                                </div>
                            )}
                            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 md:flex-none text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background font-bold rounded-2xl hover:bg-foreground/90 active:scale-95 transition-all uppercase tracking-[0.2em] text-xs shadow-2xl"
                                >
                                    <Save size={18} />
                                    Save Event
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </ResponsiveModal>

            <ConfirmationDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
                variant={confirmDialog.variant}
                type={confirmDialog.type}
            />
        </div>
    );
}
