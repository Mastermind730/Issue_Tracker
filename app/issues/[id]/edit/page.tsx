
import IssueForm from "@/app/components/IssueForm";
import React from 'react'
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";


interface Props{
    params:{id:string}
}
const prisma=new PrismaClient();
const EditIssuePage = async ({params}:Props) => {
    let issue=await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    });
    if(!issue) notFound();
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage