import IssueStatusBadge from '@/app/components/IssueBadge';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Box,Grid,Button } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons'
const prisma = new PrismaClient();
import Link from 'next/link';
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    throw notFound();
  }

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box className="p-4">
        <label className="block text-gray-600 font-semibold mb-2">Title:</label>
        <span className="text-2xl font-bold mb-4 block">{issue.title}</span>

        <label className="block text-gray-600 font-semibold mb-2">Description:</label>
        <div className="min-h-[50] w-[300] box-border">
          <p className="text-gray-800 mb-4">{issue.description}</p>
        </div>
        <hr className="my-4 border-t" />

        <label className="block text-gray-600 font-semibold mb-2">Status:</label>
        <IssueStatusBadge status={issue.status} />

        <br />

        <label className="block text-gray-600 font-semibold mb-2">Created at:</label>
        <span className="mb-4">{new Date(issue.createdAt).toLocaleDateString()}</span>
      </Box>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
