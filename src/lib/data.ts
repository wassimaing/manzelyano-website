import { Testimonial } from '@/data/testimonials'
import { supabase } from './supabase'
import { Department } from '@/data/team'
import { Event } from '@/data/events'

/**
 * Helper to get the public URL for an image stored in Supabase Storage.
 * If the image path is already a full URL, it returns it as is.
 */
export function getStorageUrl(path: string | null | undefined, bucket: string = 'COO'): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Strip leading bucket name from path if present
    const cleanPath = path.replace(new RegExp(`^${bucket}/`), '');

    const { data } = supabase.storage.from(bucket).getPublicUrl(cleanPath);
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
                id: m.id,
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
        .order('start_date', { ascending: false })

    if (error) {
        console.error('Error fetching events:', error);
        throw error;
    }

    return (data || []).map(item => ({
        ...item,
        startDate: item.start_date,
        endDate: item.end_date,
        durationDays: item.duration_days,
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
        startDate: data.start_date,
        endDate: data.end_date,
        durationDays: data.duration_days,
        image: getStorageUrl(data.image),
        gallery: (data.gallery || []).map((img: string) => getStorageUrl(img))
    };
}

// --- Admin CRUD Operations ---

// Events
export async function createEvent(event: Omit<Event, 'id'>) {
    const { startDate, endDate, durationDays, ...rest } = event;
    const dbEvent = {
        ...rest,
        start_date: startDate,
        end_date: endDate,
        duration_days: durationDays
    };

    const { data, error } = await supabase
        .from('events')
        .insert([dbEvent])
        .select()
        .single()
    if (error) throw error
    return data
}

export async function updateEvent(id: string, updates: Partial<Event>) {
    const { startDate, endDate, durationDays, ...rest } = updates;
    const dbUpdates: any = { ...rest };
    if (startDate) dbUpdates.start_date = startDate;
    if (endDate) dbUpdates.end_date = endDate;
    if (durationDays) dbUpdates.duration_days = durationDays;

    const { data, error } = await supabase
        .from('events')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single()
    if (error) throw error
    return data
}

export async function deleteEvent(id: string) {
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
    if (error) throw error
}

// Team Members
export async function createTeamMember(member: any) {
    const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select()
        .single()
    if (error) throw error
    return data
}

export async function updateTeamMember(id: number, updates: any) {
    const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
    if (error) throw error
    return data
}

export async function deleteTeamMember(id: number) {
    const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)
    if (error) throw error
}

// Testimonials
export async function createTestimonial(testimonial: Omit<Testimonial, 'id'>) {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonial])
        .select()
        .single()
    if (error) throw error
    return data
}

export async function updateTestimonial(id: number, updates: Partial<Testimonial>) {
    const { data, error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)
        .select()
    if (error) throw error
    return data
}

export async function deleteTestimonial(id: number) {
    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
    if (error) throw error
}

// Site Settings & Stats
export async function getSiteStats() {
    // 1. Get Events Count
    const { count: eventsCount, error: eventsError } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
    if (eventsError) throw eventsError

    // 2. Get Departments Count
    const { count: deptsCount, error: deptsError } = await supabase
        .from('departments')
        .select('*', { count: 'exact', head: true })
    if (deptsError) throw deptsError

    // 3. Get Team Members Count (baseline)
    const { count: membersCount, error: membersError } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true })
    if (membersError) throw membersError

    // 4. Get Site Settings
    const { data: settings, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['alumni_count', 'active_members_count'])

    const alumniSetting = settings?.find(s => s.key === 'alumni_count');
    const activeSetting = settings?.find(s => s.key === 'active_members_count');

    // Fallback values if table/row missing
    const alumniCount = alumniSetting ? parseInt(alumniSetting.value) : 85
    const activeMembersCount = activeSetting ? parseInt(activeSetting.value) : (membersCount || 0) + 80

    return {
        eventsCount: eventsCount || 0,
        deptsCount: deptsCount || 0,
        membersCount: activeMembersCount,
        alumniCount: alumniCount
    }
}

export async function updateAlumniCount(count: number) {
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key: 'alumni_count', value: count.toString() }, { onConflict: 'key' })
        .select()
        .single()
    if (error) throw error
    return data
}

export async function updateActiveMembersCount(count: number) {
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({ key: 'active_members_count', value: count.toString() }, { onConflict: 'key' })
        .select()
        .single()
    if (error) throw error
    return data
}