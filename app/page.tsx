"use client";
import React from "react";
import Link from "next/link";
import { Card, Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-5xl font-bold mb-8">Issue Tracker</h1>
      <Card className="max-w-lg w-full p-6 bg-white rounded-md shadow-md mb-6">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Issue Tracker</h2>
        <p className="text-lg mb-4">
          This application helps you manage and track issues effectively. You can create, view, and update issues, and monitor their status in real-time.
        </p>
        <p className="text-lg mb-4">
          Use the links below to navigate through the application and get started with managing your issues.
        </p>
      </Card>
      <div className="flex flex-col items-center">
        <Link href="/dashboard">
          <Button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md mb-4">Go to Dashboard</Button>
        </Link>
        <Link href="/create-issue">
          <Button className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md mb-4">Create a New Issue</Button>
        </Link>
        <Link href="/issues">
          <Button className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow-md">View All Issues</Button>
        </Link>
      </div>
    </div>
  );
}
