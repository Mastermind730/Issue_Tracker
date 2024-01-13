import Link from 'next/link';
import delay from 'delay';
import IssueActions from './IssueActions';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueBadge';
import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

const IssuesPage = async () => {
  // Fetch issues from Prisma
  const issues = await prisma.issue.findMany();
  await delay(2000);

  return (
    <div className="p-4">
      <IssueActions />

      <Table.Root className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="p-2">Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-2 hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-2 hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id} className="hover:bg-gray-100">
              <Table.Cell className="p-2">
              <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="p-2 hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="p-2 hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
