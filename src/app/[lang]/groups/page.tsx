import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateGroupForm } from '@/components/groups/create-group-form';
import { JoinGroupForm } from '@/components/groups/join-group-form';

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
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Spleasy</h1>
          <p className="text-muted-foreground">Split expenses easily with friends.</p>
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
