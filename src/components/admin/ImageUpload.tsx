"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2, Plus, Crop } from "lucide-react";
import { uploadFile } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { ImageCropper } from "./ImageCropper";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    cropShape?: 'rect' | 'round';
    aspect?: number;
}

export function ImageUpload({ value, onChange, label, cropShape = 'rect', aspect = 1 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result as string);
            setIsCropperOpen(true);
        };
        reader.readAsDataURL(file);
    };

    const onCropComplete = async (croppedBlob: Blob) => {
        setIsCropperOpen(false);
        try {
            setUploading(true);
            // Convert Blob to File
            const file = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
            const url = await uploadFile(file);
            onChange(url);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please check your Supabase storage settings.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = () => {
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleEditExisting = () => {
        if (value) {
            setSelectedImage(value);
            setIsCropperOpen(true);
        }
    };

    return (
        <div className="space-y-2">
            {label && <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] ml-1">{label}</label>}
            <div
                className={cn(
                    "relative group w-full aspect-video rounded-2xl border-2 border-dashed border-border hover:border-pink-500/50 transition-all flex flex-col items-center justify-center overflow-hidden bg-muted/50",
                    value && "border-none"
                )}
                onClick={() => !value && !uploading && fileInputRef.current?.click()}
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-pink-500" size={32} />
                        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Uploading...</span>
                    </div>
                ) : value ? (
                    <>
                        <img src={value} alt="Preview" className={cn("w-full h-full object-cover", cropShape === 'round' && "scale-90 rounded-full border-4 border-muted")} />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); handleEditExisting(); }}
                                    className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-full uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg shadow-pink-500/20"
                                >
                                    <Crop size={14} />
                                    Crop
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                    className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-widest hover:bg-neutral-200 transition-all"
                                >
                                    Change
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-4 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                            <Upload size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-foreground">Choose Image or Drag & Drop</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP up to 5MB</p>
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />
            </div>

            {selectedImage && (
                <ImageCropper
                    image={selectedImage}
                    isOpen={isCropperOpen}
                    onClose={() => {
                        setIsCropperOpen(false);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    onCropComplete={onCropComplete}
                    aspect={aspect}
                    cropShape={cropShape}
                />
            )}
        </div>
    );
}

interface MultiImageUploadProps {
    values: string[];
    onChange: (urls: string[]) => void;
    label?: string;
}

export function MultiImageUpload({ values, onChange, label }: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        try {
            setUploading(true);
            const urls = await Promise.all(
                Array.from(files).map(file => uploadFile(file))
            );
            onChange([...values, ...urls]);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please check your Supabase storage settings.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const removeImage = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {label && <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] ml-1">{label}</label>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {values.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                        <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className="aspect-square rounded-2xl border-2 border-dashed border-border hover:border-pink-500/50 transition-all flex flex-col items-center justify-center bg-muted/50 cursor-pointer"
                >
                    {uploading ? (
                        <Loader2 className="animate-spin text-pink-500" size={24} />
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Plus size={24} className="text-muted-foreground" />
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Add Image</span>
                        </div>
                    )}
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple
            />
        </div>
    );
}
