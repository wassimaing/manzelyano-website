import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('SUPABASE URL:', url)
console.log('SUPABASE KEY:', key)

if (!url || !key) {
    throw new Error(`Missing env vars — URL: ${url}, KEY: ${key}`)
}

export const supabase = createClient(url, key)