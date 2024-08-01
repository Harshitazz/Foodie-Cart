'use client'
import { getOrders } from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


function MyOrders() {
  const { user } = useUser()
  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    user && GetOrders();
  }, [user])
  const GetOrders = () => {
    getOrders(user?.emailAddresses[0]?.emailAddress).then(resp => {
      console.log(resp?.orders)
      setOrderList(resp?.orders)
    }
    )
  }
  return (
    <div>
      <h2 className='font-bold text-xl'>My Orders</h2>
      <div className='w-[80%]'>
        {orderList.map((order, index) => (
          <div className='p-3 border rounded-xl my-2'>
            <h2>{moment(order?.createdAt).format('DD-MM-YYYY')}</h2>
            <h2 className='flex justify-between'>Order Total Amount :<span> {order.orderAmount}</span></h2>
            <h2 className='flex justify-between'>Address :<span> {order.address}, {order.zip}</span></h2>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger><h2 className='text-red-500 underline text-sm cursor-pointer'>
                  View Order Details
                </h2></AccordionTrigger>
                <AccordionContent>
                  <div>
                    {order?.orderDetails?.map((item, index) => (
                      <div className='flex justify-between'>
                        <h2>{item.name}</h2>
                        <div className='flex'>
                          <h2>{item.countItems}</h2>
                          <h2>X</h2>
                          <h2>&#8377;{item.price}</h2>
                        </div>

                      </div>
                    ))}
                    <h2 className='text-base font-semibold'>Total Order Amount (including taxes + delivery): &#8377;{order.orderAmount}</h2>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
