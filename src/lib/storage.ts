import { supabase } from "./supabase";

/**
 * Uploads a file to a Supabase bucket and returns the public URL.
 * @param file The file to upload.
 * @param bucket The bucket name (defaults to 'events').
 * @returns The public URL of the uploaded file.
 */
export async function uploadFile(file: File, bucket: string = "COO"): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
}

/**
 * Uploads multiple files and returns an array of public URLs.
 */
export async function uploadMultipleFiles(files: FileList | File[], bucket: string = "events"): Promise<string[]> {
    const fileArray = Array.from(files);
    const uploadPromises = fileArray.map(file => uploadFile(file, bucket));
    return Promise.all(uploadPromises);
}
