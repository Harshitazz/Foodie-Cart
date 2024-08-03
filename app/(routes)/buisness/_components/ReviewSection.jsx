'use client'
import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/clerk-react";
import { AddNewReview, getRestroReview } from '@/app/_utils/GlobalApi';
import moment from 'moment';

function ReviewSection({ restaurant }) {
    const { user } = useUser()
    const [review, setReview] = useState();
    const [reviewList, setReviewList] = useState([]);


    useEffect(() => {
        restaurant && getReviewList()
    }, [restaurant])
    const handleSubmit = () => {

        const data = {
            email: user.emailAddresses[0].emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            reviewText: review,
            RestroSlug: restaurant?.slug
        }

        AddNewReview(data).then(resp => {
            alert('Review Added!')
            resp && getReviewList()
        })
    }

    const getReviewList = () => {
        getRestroReview(restaurant.slug).then(resp => {
            setReviewList(resp.reviews)
        }
        )
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
            <div className='flex flex-col gap-3 p-3 shadow-lg'>
                <h2 className='text-lg '>Add you Review</h2>
                <Textarea onChange={(e) => setReview(e.target.value)} />
                <button onClick={() => handleSubmit()} className='p-2 mx-2 cursor-pointer hover:scale-105 rounded-full border-2 border-customDark'>
                    Submit
                </button>
            </div>
            <div className='col-span-2'>
    <div className='flex flex-col gap-6'>
        {reviewList.length>0 ? reviewList.map((item, index) => (
            <div key={index} className='bg-slate-100 p-4 flex gap-4 items-start shadow-md'>
                <img width={40} height={40} className='rounded-full flex-shrink-0' src={item.profileImage} />
                <div className='flex flex-col w-full'>
                    {/* <h2 className='text-sm'>{item.userName}</h2> */}
                    <div className=' break-words w-[80%] '>
                        {item.reviewText}
                    </div>
                    <h2 className='text-sm text-gray-400'>{item.userName} on {moment(item.createdAt).format('DD-MM-YYYY')}</h2>
                </div>
            </div>
            
        ))
    :
    [1,2,3,4].map((index)=>(
        <div key={index} className='h-[50px] w-full animate-pulse rounded-lg bg-slate-200'>

        </div>
    ))
    }
    </div>
</div>



        </div>
    )
}

export default ReviewSection
