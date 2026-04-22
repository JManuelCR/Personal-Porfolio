import { createClient } from "@supabase/supabase-js";
import { profile } from "console";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

export async function getPublicUrl(
  path: string,
  expires: number = 3600,
  type: 'image' | 'video' = 'image',
) {
  const bucket = type === 'image' ? "portfolio-images" : "portfolio-videos";
  const { data } = await supabase.storage
  .from(bucket)
  .getPublicUrl(path);

  return data.publicUrl;
}
