import { Calendar, Clock, MapPin, User } from 'lucide-react';
import React from 'react';

function BookingHistoryList({ bookingHistory }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {bookingHistory.map((booking, index) => (
        <div 
          key={index} 
          className='flex border rounded-lg p-4 mb-5 items-stretch' // Ensures both sides have the same height
        >

          {/* Business Image Section */}
          {booking.businessList.map((business, bIndex) => (
            <div key={bIndex} className='w-1/3 h-full flex-shrink-0'>
              {business.images?.[0]?.url && (
                <img
                  src={business.images[0].url}
                  alt='Business'
                  className='w-full h-full object-cover rounded-lg'
                />
              )}
            </div>
          ))}

          {/* Business Details and Booking Information */}
          <div className='flex flex-col w-2/3 gap-2 px-4 justify-center'>

            {/* Business Name */}
            <h2 className='font-bold text-lg'>{booking.businessList[0]?.name}</h2>

            {/* Contact Person */}
            <h2 className='flex gap-2 text-primary'>
              <User /> {booking.businessList[0]?.contactPerson || 'No Contact Info'}
            </h2>

            {/* Address - Ensuring it remains in one line if possible, or breaks into two lines */}
            <h2 className='flex gap-2 text-gray-500 whitespace-normal break-words'> 
              <MapPin className='text-primary' /> 
              <span>{booking.businessList[0]?.address || 'No Address'}</span>
            </h2>

            {/* Booking Date & Time */}
            <h2 className='flex gap-2 text-gray-500'>
              <Calendar className='text-primary' /> Service on: <span className='text-black'>{booking.date}</span>
            </h2>
            <h2 className='flex gap-2 text-gray-500'>
              <Clock className='text-primary' /> Service at: <span className='text-black'>{booking.time}</span>
            </h2>

          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistoryList;
