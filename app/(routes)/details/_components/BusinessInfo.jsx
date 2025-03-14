import { Button } from '@/components/ui/button'
import { Clock, Mail, MapPin, Share, User } from 'lucide-react' // ✅ Added Share Import
import Image from 'next/image'
import React from 'react'

function BusinessInfo({ business }) {
  return business?.name && (
    <div className='flex flex-col md:flex-row gap-4 items-center'>
      <Image
        src={business?.images[0]?.url}
        alt={business.name}
        width={150}
        height={200}
        className='rounded-full h-[150px] object-cover'
      />
      <div className='flex flex-col md:flex-row justify-between items-center w-full'>


        <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
          <h2 className='text-primary bg-purple-100 rounded-full p-1 px-3 text-lg'>
            {business?.category?.name}
          </h2>
          <h2 className='text-[40px] font-bold'>{business.name}</h2>

          {/* Contact Person & Availability - Show above Address on small screens */}
        <div className='flex flex-col gap-5 items-start md:hidden'>
          <h2 className='flex gap-2 text-xl text-primary'>
            <User /> {business.contactPerson}
          </h2>
          <h2 className='flex gap-2 text-xl text-gray-500'>
            <Clock /> Available 8:00 AM to 10:00 PM
          </h2>
        </div>

          {/* Address - Appears below Contact Info on small screens */}
          <h2 className='flex gap-2 text-lg text-gray-500'>
            <MapPin /> {business.address}
          </h2>

          <h2 className='flex gap-2 text-lg text-gray-500'>
            <Mail /> {business?.email}
          </h2>
        </div>

        {/* Contact Person & Availability - Show on Right Side for Large Screens */}
        <div className='hidden md:flex flex-col gap-5 items-end md:items-start md:ml-5 md:mt-0'>
          <Button><Share /></Button> {/* ✅ Now Share is defined */}
          <h2 className='flex gap-2 text-xl text-primary'>
            <User /> {business.contactPerson}
          </h2>
          <h2 className='flex gap-2 text-xl text-gray-500'>
            <Clock /> Available 8:00 AM to 10:00 PM
          </h2>
        </div>

      </div>
    </div>
  );
}

export default BusinessInfo;
