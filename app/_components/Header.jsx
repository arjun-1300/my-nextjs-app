"use client"
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

function Header() {

  const {data}=useSession();

  useEffect(()=>{
    console.log(data);
  },[data])

  return (
    <div className='shadow-sm flex justify-between
    '>
      <div className='flex items-center gap-8'>
        <Image src='/logo.svg' alt='logo' width={180} height={100} />
        <div className='md:flex 
        items-center 
        gap-6 hidden
        '>
            <Link href={'/'} className='hover:scale-105 hover:text-primary 
            cursor-pointer'>Home</Link>
            <Link href={'/search/Cleaning'} className='hover:scale-105 hover:text-primary 
            cursor-pointer'>Services</Link>
            <h2 className='hover:scale-105 hover:text-primary
            cursor-pointer'>About us</h2>

        </div>
       
      </div>
        <div className='pt-7 pr-7'>
          {data?.user?
          
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
  <Image src={data?.user?.image}
          alt='user'
          width={40}
          height={40}
          className='rounded-full'
          />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={'/mybooking'}>My Bookings</Link>
      </DropdownMenuItem>
    <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>

          :  

          <Button onClick={()=>signIn('descope')} >Login / Sign up</Button>

        }        
        </div>
    </div>
  )
}

export default Header