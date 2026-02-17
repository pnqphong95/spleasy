import { redirect } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string; pin: string }> },
) {
  const { lang, pin } = await params;

  // Redirect to the main groups entry page with the pin auto-filled
  redirect(`/${lang}/groups?pin=${pin}`);
}
