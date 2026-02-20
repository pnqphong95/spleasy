import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateGroupForm } from '@/components/groups/create-group-form';
import { JoinGroupForm } from '@/components/groups/join-group-form';
import { ThemeToggleLogo } from '@/components/groups/theme-toggle-logo';
import { BackLink } from '@/components/groups/back-link';

export default async function GroupsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const { tab, pin } = await searchParams;
  const defaultTab =
    typeof tab === 'string' && ['create', 'join'].includes(tab) ? tab : pin ? 'join' : 'create';

  return (
    <div className="container relative mx-auto flex min-h-[100dvh] flex-col items-center pt-8 pb-8 px-4 sm:justify-center">
      <BackLink fallbackHref={`/${lang}`} />
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-3 text-center">
          <ThemeToggleLogo className="h-16 w-16" />
          <div className="space-y-1">
            <h1 className="font-heading text-2xl font-bold tracking-tight">Spleasy</h1>
            <p className="text-muted-foreground text-sm">Split expenses peacefully.</p>
          </div>
        </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Group</TabsTrigger>
            <TabsTrigger value="join">Join Group</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <CreateGroupForm lang={lang} />
          </TabsContent>
          <TabsContent value="join">
            <JoinGroupForm lang={lang} initialPin={typeof pin === 'string' ? pin : ''} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
