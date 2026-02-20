-- Run this in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.site_settings (
    key text PRIMARY KEY,
    value text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow everyone to see the settings
CREATE POLICY "Allow public read-only access" ON public.site_settings
FOR SELECT USING (true);

-- Allow logged-in admins to manage settings
-- Note: This assumes you use Supabase Auth for the admin dashboard
CREATE POLICY "Allow authenticated management" ON public.site_settings
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert initial baseline values
INSERT INTO public.site_settings (key, value)
VALUES 
    ('alumni_count', '85'),
    ('active_members_count', '120')
ON CONFLICT (key) DO NOTHING;

-- Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    dob date,
    institute text,
    email text NOT NULL,
    portfolio text,
    about_me text,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
);

-- Enable RLS for applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow public to submit applications
CREATE POLICY "Allow public submission" ON public.applications
FOR INSERT WITH CHECK (true);

-- Allow admins to view applications
CREATE POLICY "Allow authenticated read" ON public.applications
FOR SELECT TO authenticated USING (true);
