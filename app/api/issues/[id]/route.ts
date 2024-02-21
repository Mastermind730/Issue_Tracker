import { createIssueSchema } from "@/app/ValidationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    let issue_id = await req.url.slice(req.url.lastIndexOf("/") + 1);
    issue_id = decodeURI(issue_id);
    let numeric_id;
    numeric_id=parseInt(issue_id,10);
    const issues = await prisma.issue.findMany({
        where: {
            id: numeric_id,
          },
      
    });
    if (issues) {
      return NextResponse.json({
        status: "success",
        msg: issues.length + " available Issues",
        issues,
      });
    }else{
      return NextResponse.json({
          status:"Success",
          msg:"No data found",
      })
    }
  }
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updateIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
