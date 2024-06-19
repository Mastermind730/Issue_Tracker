"use client";
import React from "react";
import Link from "next/link";
import { Card, Button } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-bold mb-8">Issue Tracker</h1>
      
      <Card className="max-w-3xl w-full p-6 bg-white rounded-md shadow-md mb-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Issue Tracker</h2>
        <p className="text-lg mb-4">
          This application helps you manage and track issues efficiently. You can create, view, and update issues, and monitor their status in real-time.
        </p>
        <p className="text-lg mb-4">
          Whether you are managing a software project or tracking tasks in your team, our Issue Tracker is designed to help you stay organized and on top of your work.
        </p>
      </Card>
      
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {/* <Link href="/dashboard"> */}
            <Card className="w-64 p-4 bg-blue-500 text-black rounded-md shadow-md hover:bg-blue-600 transition">
              <h3 className="text-2xl font-semibold mb-2">Go to Dashboard</h3>
              <p>View overall status and metrics of your issues.</p>
            </Card>
        {/* </Link> */}
        {/* <Link href="/create-issue"> */}
            <Card className="w-64 p-4 bg-green-500 text-black rounded-md shadow-md hover:bg-green-600 transition">
              <h3 className="text-2xl font-semibold mb-2">Create a New Issue</h3>
              <p>Log a new issue or task to be tracked.</p>
            </Card>
        {/* </Link> */}
        {/* <Link href="/issues"> */}
            <Card className="w-64 p-4 bg-yellow-500 text-black rounded-md shadow-md hover:bg-yellow-600 transition">
              <h3 className="text-2xl font-semibold mb-2">View All Issues</h3>
              <p>Browse and manage all existing issues.</p>
            </Card>
        {/* </Link> */}
      </div>
      
      <footer className="mt-12 text-center">
        <p className="text-gray-600">© 2024 Issue Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
