import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateGroupForm } from '@/components/groups/create-group-form';

export default async function GroupsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const { tab } = await searchParams;
  const defaultTab = typeof tab === 'string' && ['create', 'join'].includes(tab) ? tab : 'create';

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
            <div className="text-muted-foreground bg-muted/50 rounded-lg p-4 text-center">
              Join functionality coming in Feature 2.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
