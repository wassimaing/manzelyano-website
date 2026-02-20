"use client";

import { useState, useEffect } from "react";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/data";
import { Testimonial } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Edit2,
    Trash2,
    X,
    Save,
    User,
    Briefcase,
    MessageSquare,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    Quote
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { ConfirmationDialog } from "@/components/admin/ConfirmationDialog";

export default function TestimonialsManagement() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
        name: "",
        role: "",
        image: "",
        text: ""
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

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (testimonial?: Testimonial) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData({
                name: testimonial.name,
                role: testimonial.role,
                image: testimonial.image,
                text: testimonial.text
            });
        } else {
            setEditingTestimonial(null);
            setFormData({
                name: "",
                role: "",
                image: "",
                text: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        try {
            if (editingTestimonial) {
                await updateTestimonial(editingTestimonial.id, formData);
                setMessage({ type: 'success', text: 'Testimonial updated successfully!' });
            } else {
                await createTestimonial(formData);
                setMessage({ type: 'success', text: 'Testimonial added successfully!' });
            }
            fetchTestimonials();
            setTimeout(() => setIsModalOpen(false), 1500);
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Operation failed. Please try again.' });
            console.error("Error saving testimonial:", error.message || error, error);
        }
    };

    const handleDelete = async (id: number) => {
        setConfirmDialog({
            isOpen: true,
            title: "Delete Testimonial?",
            message: "Are you sure you want to delete this community feedback? This action is permanent.",
            variant: 'danger',
            type: 'confirm',
            onConfirm: async () => {
                try {
                    await deleteTestimonial(id);
                    setTestimonials(testimonials.filter(t => t.id !== id));
                    setMessage({ type: 'success', text: 'Testimonial deleted successfully.' });
                } catch (error) {
                    console.error("Error deleting testimonial:", error);
                    setMessage({ type: 'error', text: 'Failed to delete testimonial.' });
                }
            }
        });
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground uppercase tracking-tight">Testimonials <span className="text-pink-500">Management</span></h1>
                    <p className="text-muted-foreground">Manage community feedback and stories.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20"
                >
                    <Plus size={20} />
                    New Testimonial
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-panel p-8 rounded-[2rem] border border-border relative group"
                        >
                            <Quote className="absolute top-8 right-8 text-foreground/5 group-hover:text-pink-500/10 transition-colors" size={60} />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-border group-hover:border-pink-500/50 transition-all">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="z-10">
                                    <h3 className="text-lg font-bold text-foreground transition-colors">{t.name}</h3>
                                    <p className="text-xs font-mono text-pink-500 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed italic mb-8 relative z-10">"{t.text}"</p>

                            <div className="flex gap-3 pt-6 border-t border-border">
                                <button
                                    onClick={() => handleOpenModal(t)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all text-xs font-bold uppercase tracking-widest"
                                >
                                    <Edit2 size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/10 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all text-xs font-bold uppercase tracking-widest"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <ResponsiveModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title={`${editingTestimonial ? "Edit" : "New"} Testimonial`}
                maxWidth="max-w-2xl"
            >
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Author Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-muted border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all placeholder:text-muted-foreground/40 font-sans"
                                    placeholder="Sarah Ben Ali"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Role / Tag</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                <input
                                    required
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-muted border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all placeholder:text-muted-foreground/40 font-sans"
                                    placeholder="Alumni Sister"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <ImageUpload
                            label="Author Photo"
                            value={formData.image}
                            cropShape="round"
                            aspect={1}
                            onChange={(url: string) => {
                                setFormData({ ...formData, image: url });
                                if (editingTestimonial) {
                                    updateTestimonial(editingTestimonial.id, { image: url }).catch(e => console.error("Auto-save failed:", e));
                                }
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Feedback Text</label>
                        <div className="relative">
                            <div className="absolute left-4 top-4 text-muted-foreground/60">
                                <MessageSquare size={18} />
                            </div>
                            <textarea
                                required
                                rows={4}
                                value={formData.text}
                                onChange={e => setFormData({ ...formData, text: e.target.value })}
                                className="w-full bg-muted border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all resize-none placeholder:text-muted-foreground/40 font-sans"
                                placeholder="Write the testimonial here..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                        {message ? (
                            <div className={`flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                {message.text}
                            </div>
                        ) : <div />}
                        <button
                            type="submit"
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all uppercase tracking-[0.1em] text-xs shadow-lg"
                        >
                            <Save size={18} />
                            Save Testimonial
                        </button>
                    </div>
                </form>
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
