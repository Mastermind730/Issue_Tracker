import React from 'react';
import { Button, Table } from "@radix-ui/themes";
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import IssueStatusBadge from '../../components/IssueBadge';

const prisma = new PrismaClient();

const Page = async () => {
  let issues = await prisma.issue.findMany();

  return (
    <>
      <div className='mb-5'>
        <Button className='bg-blue-500 text-white p-2'>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
      <Table.Root className='w-full p-4 border'>
        <Table.Header>
          <Table.Row className='bg-gray-200'>
            <Table.ColumnHeaderCell className='p-2'>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell p-2'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell p-2'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id} className='border-t'>
              <Table.Cell className='p-2'>
                {issue.title}
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell p-2'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell p-2'>{issue.status}</Table.Cell>
              <Table.Cell className='hidden md:table-cell p-2'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Page;
