"use client";
import React, { useState,useEffect } from "react";
import { BarChart, Bar,   ResponsiveContainer,
   XAxis, YAxis } from "recharts";
   import axios from "axios";


   
const Dashboardpage = () => {
  // const [data, setdata] = useState([])
  const [open_count, setopencount] = useState(0)
  const [inprogress_count, setinprogcount] = useState(0)
  const [closed_count, setclosecount] = useState(0);
  
  useEffect(() => {

    async function getdata() {
      let res=await axios.get("/api/issues");
       let data=await res.data;
       console.log(data);
       let o_count=data.open_count;
       setopencount(o_count);
       let inprog_count=data.inprogress_count;
       setinprogcount(inprog_count);

       let clo_count=data.closed_count;
       setclosecount(clo_count);

    }
    getdata();
  }, )
  



  const graph_data = [
    { name: "Open", count: open_count },
    { name: "In Progress", count: inprogress_count },
    { name: "Closed", count: closed_count },
    // { name: "Geek-o-mania", students: 1000 },
];
console.log(graph_data)
  return <div>
    <div className="flex items-center justify-around w-[300px] bg-gray-200 p-4 rounded-md shadow-md mb-7">
  <div className="mx-2 my-4 p-2 bg-blue-500 text-white rounded">
    Open: {open_count}
  </div>
  <div className="mx-2 my-4 p-2 bg-yellow-500 text-white rounded">
     Progress: {inprogress_count}
  </div>
  <div className="mx-2 my-4 p-2 bg-green-500 text-white rounded">
    Closed: {closed_count}
  </div>
</div>

    <ResponsiveContainer width="50%" height={300}>
        <BarChart data={graph_data}>
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 10]}  />
          <Bar
            dataKey="count"
            barSize={60}
            fill="green"
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>

  </div>;
};

export default Dashboardpage;
