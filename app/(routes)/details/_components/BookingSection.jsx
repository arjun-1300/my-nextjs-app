import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import moment from 'moment';


function BookingSection({children,business}) {
  const [date, setDate] = useState(new Date());
  const [timeSlot,setTimeSlot]=useState([]);
  const [selectedTime,setSelectedTime]=useState();
  const [bookedSlot,setBookedSlot]=useState([]);
  const {data}=useSession();
  useEffect(()=>{
    getTime();
  },[])

  useEffect(()=>{
    date&&BusinessBookedSlot();
  },[date])

  /**
   * Get Selected Date Business Booked Slot
   */
  const BusinessBookedSlot=()=>{
    GlobalApi.BusinessBookedSlot(business.id,moment(date).format('DD-MMM-YYYY'))
    .then(resp=>{
      console.log(resp)
      setBookedSlot(resp.bookings)
    })
  }

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
        timeList.push({
            time: i + ':00 AM'
        })
        timeList.push({
            time: i + ':30 AM'
        })
    }
    for (let i = 1; i <= 6; i++) {
        timeList.push({
            time: i + ':00 PM'
        })
        timeList.push({
            time: i + ':30 PM'
        })
    }

    setTimeSlot(timeList)
  }

  const saveBooking=()=>{
    GlobalApi.createNewBooking(business.id,moment(date).format('DD-MMM-YYYY'),selectedTime,data.user.email,data.user.name)
    .then(resp=>{
        console.log(resp);
        if(resp)
        {
            setDate();
            setSelectedTime('');
            toast('Service Booked successfully!')
            // Toast Msg 
        }
    },(e)=>{
        toast('Error while creating booking')
        //Error Toast Msg
    })
  }

  const isSlotBooked=(time)=>{
    return bookedSlot.find(item=>item.time==time)
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
              <section id='SheetDescription' className='text-gray-600'>
              Select Date and Time slot to book a service
              {/* {Date Picker} */}

              <section className="flex flex-col gap-3 items-start">
              <section className='font-bold'>Select Date</section>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </section>
            <section className='flex items-baseline my-5 font-bold'>Select Time Slot</section>
            {/* Time Slot Picker */}
            <section className="grid grid-cols-3 gap-3">
              {timeSlot.map((item,index)=>(
                <Button key={index}
                  disabled={isSlotBooked(item.time)}
                  variant='outiline'
                  className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white
                    ${selectedTime==item.time&&'bg-primary text-white'}`}
                  onClick={()=>setSelectedTime(item.time)}
                >{item.time}</Button>
              ))}
            </section>
          
          </section>
        </SheetHeader>
        <SheetFooter className='mt-5 w-full'>
              <SheetClose asChild>
                <section className='flex gap-5'>
                <Button variant='destructive' className=''>cancel</Button>
                <Button 
                disabled={!(selectedTime&&date)}
                onClick={()=>saveBooking()}
                >
                  Book</Button>
                </section>
                
              </SheetClose>
            </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;