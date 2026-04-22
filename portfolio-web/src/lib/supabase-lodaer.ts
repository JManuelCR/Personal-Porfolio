export default function supabaseLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  // Si la URL es de tu proyecto de Supabase
  if (src.includes('vmikdkdnsivhxtkczvtr.supabase.co')) {
    const url = new URL(src);
    // Agregamos parámetros de transformación de Supabase
    url.searchParams.set('width', width.toString());
    url.searchParams.set('quality', (quality || 75).toString());
    return url.toString();
  }
  return src;
}