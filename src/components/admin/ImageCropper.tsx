"use client";

import React, { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { X, Check } from 'lucide-react';
import { ResponsiveModal } from './ResponsiveModal';

interface ImageCropperProps {
    image: string;
    aspect?: number;
    cropShape?: 'rect' | 'round';
    isOpen: boolean;
    onClose: () => void;
    onCropComplete: (croppedImage: Blob) => void;
}

export function ImageCropper({ image, aspect = 1, cropShape = 'rect', isOpen, onClose, onCropComplete }: ImageCropperProps) {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropChange = (crop: Point) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteInternal = useCallback((_un: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const handleConfirm = async () => {
        if (!croppedAreaPixels) return;
        try {
            const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedBlob);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ResponsiveModal isOpen={isOpen} setIsOpen={(open) => !open && onClose()} title="Adjust Image" maxWidth="max-w-xl">
            <div className="flex flex-col gap-6 p-6">
                <div className="relative w-full aspect-square bg-black/20 rounded-xl overflow-hidden min-h-[400px]">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        cropShape={cropShape}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteInternal}
                        onZoomChange={onZoomChange}
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Zoom</span>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="flex-1 accent-pink-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-6 py-2 rounded-xl text-sm font-bold bg-pink-500 text-white hover:bg-pink-600 transition-all flex items-center gap-2 shadow-lg shadow-pink-500/20"
                        >
                            <Check size={16} />
                            Apply Crop
                        </button>
                    </div>
                </div>
            </div>
        </ResponsiveModal>
    );
}
