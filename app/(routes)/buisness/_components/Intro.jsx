import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function Intro({ restaurant }) {
    const [avgPrice, setAvgPrice] = useState(0);

    useEffect(() => {
        let count = 0;
        let total = 0;
        for (let i = 0; i < restaurant.menu?.length; i++) {
            for (let j = 0; j < restaurant.menu[i].menuItem?.length; j++) {
                total += restaurant.menu[i].menuItem[j]?.price || 0;
                count++;
            }
        }
        const avgPrice = count > 0 ? total / count : 0;
        setAvgPrice(avgPrice);
    }, [restaurant]);
    
    return (
        <div className='m-4 flex justify-center'>

            <div className="rounded-lg p-6 bg-gradient-to-b from-transparent to-gray-300">
                <div className="flex  flex-col  bg-white border border-gray-200 rounded-lg shadow md:gap-4 md:flex-row md:w-[50rem] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img className="object-cover p-1 rounded-t-lg h-96 md:h-[250px] md:rounded-none md:rounded-s-lg" src={restaurant?.banner?.url || restaurant?.image} alt="" />
                    <div className="flex flex-col my-2 w-full p-4 ">
                        <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h5>
                        <h2 className='text-red-600 font-semibold '>
                        {restaurant.restroType?.map((r,i)=>(
                            <span className='mr-2' key={i}>{r.toUpperCase()}</span>
                        ))}
                        </h2>
                        <h2 className="mb-1 text-sm font-normal text-gray-500 dark:text-gray-400">&#8377;{avgPrice} for Two</h2>
                        <h2 className=" text-lg font-normal text-gray-600 dark:text-gray-400">
                        <FontAwesomeIcon icon={faLocationPin} />
                            {restaurant.address}</h2>

                        <h2 className="font-semibold text-indigo-950 text-lg ">{restaurant.aboutUs}</h2>


                    </div>
                </div>

            </div>



        </div>
    )
}

export default Intro
