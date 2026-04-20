import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

export async function getPublicUrl(path: string, expires: number = 3600) {
    const  {data, error} = await supabase
    .storage
    .from('portfolio-images')
    .createSignedUrl(path, expires)
    console.log(error)

    if(error){
        return ''
    }
    return data.signedUrl
    }