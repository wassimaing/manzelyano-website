import { Testimonial } from '@/data/testimonials'
import { supabase } from './supabase'
import { Department } from '@/data/team'
import { Event } from '@/data/events'

/**
 * Helper to get the public URL for an image stored in Supabase Storage.
 * If the image path is already a full URL, it returns it as is.
 */
export function getStorageUrl(path: string | null | undefined, bucket: string = 'images'): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

export async function getTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id')

    if (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }

    return (data || []).map(item => ({
        ...item,
        image: getStorageUrl(item.image)
    }));
}

export async function getDepartments(): Promise<Department[]> {
    const { data: depts, error: deptError } = await supabase
        .from('departments')
        .select('*')
    if (deptError) throw deptError

    const { data: members, error: memberError } = await supabase
        .from('team_members')
        .select('*')
    if (memberError) throw memberError

    return depts.map(dept => ({
        id: dept.id,
        name: dept.name,
        description: dept.description,
        icon: dept.icon,
        color: dept.color,
        iconColor: dept.icon_color,
        members: members
            .filter(m => m.department_id === dept.id)
            .map(m => ({
                name: m.name,
                role: m.role,
                department: m.department_id,
                email: m.email,
                experience: m.experience,
                image: getStorageUrl(m.image),
            }))
    }))
}

export async function getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date')

    if (error) {
        console.error('Error fetching events:', error);
        throw error;
    }

    return (data || []).map(item => ({
        ...item,
        image: getStorageUrl(item.image),
        gallery: (item.gallery || []).map((img: string) => getStorageUrl(img))
    }));
}

export async function getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error fetching event detail:', error);
        throw error;
    }

    if (!data) return null;

    return {
        ...data,
        image: getStorageUrl(data.image),
        gallery: (data.gallery || []).map((img: string) => getStorageUrl(img))
    };
}