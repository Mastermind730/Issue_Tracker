"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classnames from 'classnames';

const Navbar = () => {
    const currentPath=usePathname()
    const navlinks=[
        // {
        //     title:"home",
        //     link:"/"
        // },
        {
            title:"Dashboard",
            link:"/dashboard"
        },
        {
            title:"Issues",
            link:"/issues/all"
        },

    ]
  return (
    
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between'>
  <ul className='flex align-center '>
  <Link  href={"/"}>
        <li className='mx-2 p-2 text-1.5xl  '><FaBug />
</li>
      </Link>
      {/* mx-2 p-2 text-1.5xl text-zinc-500 hover:text-zinc-800 transition-colors */}
    {navlinks.map((item, index) => (
      <Link key={index} href={item.link}>
        <li className={classnames({
            "mx-2 p-2 text-1.5xl hover:text-zinc-800 transition-colors":true,
            "text-zinc-500":item.link!==currentPath,
            "text-zinc-900":item.link===currentPath,

})}>{item.title}</li>
      </Link>
    ))}
  </ul>

</nav>

  )
}

export default Navbar