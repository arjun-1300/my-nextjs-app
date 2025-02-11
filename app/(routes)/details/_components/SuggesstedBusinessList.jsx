import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button'
import { Notebook } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from './BookingSection';


function SuggesstedBusinessList({business}) {

  const [businessList,setBusinessList]=useState([]);
    useEffect(()=>{

        business&&getBusinessList()
    },[business]);

    const getBusinessList=()=>{
        GlobalApi.getBusinessByCategory(business?.category?.name)
        .then(resp=>{
            setBusinessList(resp?.businessLists);
        })
    }

  return (
    <div className='md:pl-10'>
      
        <BookingSection business={business}>
          <Button className="flex gap-2">
          <Notebook/>
          Book Appointment
          </Button>
        </BookingSection>
        <div className='hidden md:block'>
        <h2 className='font-bold 
        text-lg mt-3 mb-3
        '>Similar Business</h2>
        <div className=''>
          {businessList&&businessList.map((business,index)=>(
            <Link href={'/details/'+business.id} className='flex gap-2 mb-5 h-[85px] w-[340px] hover:border border-primary hover:shadow-sm cursor-pointer rounded-lg p-2' key={business.id || index}>
              <Image src={business?.images[0].url} 
              alt={business}
              width={60}
              height={80}
              className='rounded-lg object-cover'
              />
              <div>
                <h2 className='font-bold'>{business.name}</h2>
                <h2 className='text-primary'>{business.contactPerson}</h2>
                <h2 className='text-gray-400'>{business.address}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SuggesstedBusinessList