"use client";
import React from "react";
import { BarChart, Bar,   ResponsiveContainer,
   XAxis, YAxis } from "recharts";
const dashboardpage = () => {
  const data = [
    { name: "Open", students: 400 },
    { name: "In Progress", students: 700 },
    { name: "Closed", students: 200 },
    // { name: "Geek-o-mania", students: 1000 },
];
  return <div>
    <h1>Dashboard Page</h1>
    <ResponsiveContainer width="50%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis  />
          <Bar
            dataKey="students"
            barSize={60}
            fill="green"
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>

  </div>;
};

export default dashboardpage;
