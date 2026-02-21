import { getDictionary } from '@/i18n/get-dictionary';
import { Locale } from '@/i18n/config';
import { GroupDashboard } from '@/components/groups/group-dashboard';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; groupId: string }>;
}) {
  const { lang, groupId } = await params;
  const dict = await getDictionary(lang as Locale);

  return <GroupDashboard groupId={groupId} lang={lang} dict={dict.dashboard} />;
}
