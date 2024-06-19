import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
import { createIssueSchema } from "../../ValidationSchema";
import axios from "axios";
import prisma from "@/lib/prismadb";
// const prisma = new PrismaClient()




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Create a new issue using Prisma
    const newIssue = await prisma.issue.create({
      data: { title: body.title, description: body.description }
    });

    // Return the created issue with a 201 status code
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try{
      let open_count=await prisma.issue.count({
        where:{
          status:"OPEN"
        }
      })
      let inprogress_count=await prisma.issue.count({
        where:{
          status:"IN_PROGRESS"
        }
      })
      let closed_count=await prisma.issue.count({
        where:{
          status:"CLOSED"
        }
      })
      let latest_data = await prisma.issue.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc"
        }
      });
      
      return NextResponse.json({open_count:open_count,inprogress_count:inprogress_count,closed_count:closed_count,latest_data:latest_data})
    }catch(error){
      console.error("Error finding count!!",error)
      return NextResponse.json({
        error:"Internal Server Error"
      },{status:500})
    }

}