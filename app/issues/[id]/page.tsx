"use client";
import IssueStatusBadge from '@/app/components/IssueBadge';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Box, Grid, Button, Flex } from '@radix-ui/themes';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Change "next/navigation" to "next/router"
import Link from 'next/link';



type Status = 'OPEN' | 'CLOSED' | 'PENDING';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
}

interface Props {
  params: { id: string };
}

const IssueDetailPage = ({ params }: Props) => {
  // const [issue, setIssue] = useState<Issue | null>(null); // Specify the type of state
  // const [issue, setissue] = useState<Issue|null>(null);
  const [issue, setissue] = useState([])

  const router = useRouter();

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${params.id}`);
        // console.log(res);
        let data=await res.data;
        console.log(data);
        setissue(data);
        console.log(issue)
      } catch (error) {
        console.error('Error fetching issue:', error);
        // Handle error or redirect to a not-found page
        router.push('/not-found');
      }
    };

    fetchIssue();
  }, [params.id,issue, router]);

  if (!issue) {
    // Return loading state or handle it accordingly
    return <div>Loading...</div>;
  }

  return (
<Grid >

      <Box >
        <label className="block text-gray-600 font-semibold mb-2">Title:</label>
        <span className="text-2xl font-bold mb-4 block">{(issue as Issue).title}</span>

        <label className="block text-gray-600 font-semibold mb-2">Description:</label>
        <div className="min-h-[50] w-[300] box-border">
          <p className="text-gray-800 mb-4">{(issue as Issue).description}</p>
        </div>
        <hr className="my-4 border-t" />

        <label className="block text-gray-600 font-semibold mb-2">Status:</label>
        <IssueStatusBadge status={(issue as Issue).status} />

        <br />

        <label className="block text-gray-600 font-semibold mb-2">Created at:</label>
        <span className="mb-4">{new Date(issue.createdAt).toLocaleDateString()}</span>
      </Box>

      <Flex gap={"2"}>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await axios.delete(`/api/issues/${issue.id}`);
            router.push('/issues/all');
            // No need to call Router.refresh(), as Next.js handles the navigation
          }}
        >
          <Pencil2Icon />
          Delete Issue
        </Button>
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;


