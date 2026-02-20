"use client";

import { useState, useEffect } from "react";
import { getDepartments, createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/data";
import { Department, TeamMember } from "@/data/team";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Save,
    User,
    Briefcase,
    Mail,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    Layout
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { ConfirmationDialog } from "@/components/admin/ConfirmationDialog";

export default function TeamManagement() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any | null>(null);
    const [formData, setFormData] = useState<any>({
        name: "",
        role: "",
        department_id: "",
        email: "",
        experience: "",
        image: ""
    });
    const [searchQuery, setSearchQuery] = useState("");
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
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const data: Department[] = await getDepartments();
            setDepartments(data);
            if (data.length > 0 && !formData.department_id) {
                setFormData((prev: any) => ({ ...prev, department_id: data[0].id }));
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (member?: any, deptId?: string) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name,
                role: member.role,
                department_id: deptId || departments[0]?.id,
                email: member.email || "",
                experience: member.experience || "",
                image: member.image
            });
        } else {
            setEditingMember(null);
            setFormData({
                name: "",
                role: "",
                department_id: deptId || departments[0]?.id || "",
                email: "",
                experience: "",
                image: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        try {
            if (editingMember && editingMember.id) {
                await updateTeamMember(editingMember.id, formData);
                setMessage({ type: 'success', text: 'Member updated successfully!' });
            } else {
                await createTeamMember(formData);
                setMessage({ type: 'success', text: 'Member added successfully!' });
            }
            fetchDepartments();
            setTimeout(() => setIsModalOpen(false), 1500);
        } catch (error: any) {
            setMessage({ type: 'error', text: 'Operation failed. Please try again.' });
            console.error("Error saving team member:", error.message || error, error);
        }
    };

    const handleDelete = async (id: number) => {
        setConfirmDialog({
            isOpen: true,
            title: "Remove Member?",
            message: "Are you sure you want to remove this team member from the club?",
            variant: 'danger',
            type: 'confirm',
            onConfirm: async () => {
                try {
                    await deleteTeamMember(id);
                    fetchDepartments();
                    setMessage({ type: 'success', text: 'Member removed successfully.' });
                } catch (error) {
                    console.error("Error deleting member:", error);
                    setMessage({ type: 'error', text: 'Failed to remove member.' });
                }
            }
        });
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground uppercase tracking-tight">Team <span className="text-pink-500">Management</span></h1>
                    <p className="text-muted-foreground">Manage club leadership and department members.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group w-full sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-pink-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all placeholder:text-muted-foreground/60"
                        />
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-pink-500/20"
                    >
                        <Plus size={20} />
                        Add Member
                    </button>
                </div>
            </header>

            <div className="space-y-12">
                {departments.map((dept) => (
                    <div key={dept.id} className="space-y-6">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
                                {dept.name}
                                <span className="text-xs font-mono text-muted-foreground font-normal ml-2">{dept.members.length} Members</span>
                            </h2>
                            <button
                                onClick={() => handleOpenModal(undefined, dept.id)}
                                className="text-xs font-bold text-muted-foreground hover:text-pink-500 uppercase tracking-widest transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} /> Add to Dept
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {dept.members
                                .filter((m: any) =>
                                    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    m.role.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((member: any) => (
                                    <motion.div
                                        key={member.name + member.role}
                                        layout
                                        className="glass-panel p-4 rounded-2xl border border-border flex flex-col items-center text-center group"
                                    >
                                        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-border group-hover:border-pink-500/50 transition-all">
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground mb-0.5">{member.name}</h3>
                                        <p className="text-[10px] text-pink-500 font-mono uppercase tracking-wider mb-3">{member.role}</p>

                                        <div className="flex gap-2 mt-auto">
                                            <button
                                                onClick={() => handleOpenModal(member, dept.id)}
                                                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-blue-500 transition-colors"
                                            >
                                                <Edit2 size={12} />
                                            </button>
                                            <button
                                                onClick={() => member.id && handleDelete(member.id)}
                                                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <ResponsiveModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title={`${editingMember ? "Edit" : "Add"} Member`}
                maxWidth="max-w-2xl"
            >
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-muted border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Role</label>
                            <div className="relative">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                <input
                                    required
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-muted border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all"
                                    placeholder="Lead Graphic Designer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Department</label>
                            <div className="relative">
                                <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                <select
                                    value={formData.department_id}
                                    onChange={e => setFormData({ ...formData, department_id: e.target.value })}
                                    className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id} className="bg-card text-foreground">
                                            {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-muted border border-border rounded-2xl py-3 pl-12 pr-4 text-foreground focus:border-pink-500/50 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Bio / Experience</label>
                        <textarea
                            value={formData.experience}
                            onChange={e => setFormData({ ...formData, experience: e.target.value })}
                            className="w-full bg-muted border border-border rounded-2xl p-4 text-foreground focus:border-pink-500/50 outline-none transition-all min-h-[120px] resize-none"
                            placeholder="Briefly describe the member's role and contributions..."
                        />
                    </div>

                    <div className="space-y-2">
                        <ImageUpload
                            label="Profile Photo"
                            value={formData.image}
                            cropShape="round"
                            aspect={1}
                            onChange={(url: string) => {
                                setFormData({ ...formData, image: url });
                                if (editingMember) {
                                    updateTeamMember(editingMember.id, { image: url }).catch(e => console.error("Auto-save failed:", e));
                                }
                            }}
                        />
                    </div>

                    <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                        {message ? (
                            <div className={`flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'text-green-500' : 'text-red-500'} animate-in fade-in slide-in-from-left-4`}>
                                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                {message.text}
                            </div>
                        ) : <div />}
                        <button
                            type="submit"
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all uppercase tracking-[0.1em] text-xs shadow-lg"
                        >
                            <Save size={18} />
                            Save Member
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
