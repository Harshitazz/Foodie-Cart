import Link from 'next/link';
import React from 'react'

function BuisnessItem({buisness}) {
  let type=buisness.restroType;
  return (
    <Link href={'/buisness/'+buisness?.slug}  className='cursor-pointer group' >
        <img className="h-[200px] object-cover rounded-lg group-hover:scale-105 transition-all duration-200 ease-in-out" src={buisness?.banner?.url || buisness?.image} alt={buisness.name} />
        <div className='mt-2'>
            <h2 className='text-lg font-semibold group-hover:underline'>{buisness.name}</h2> 
            <div className='flex text-gray-400'>{type.map((t,i)=>(
              <h2 className='' key={i}>  {t.toUpperCase()} <span>&nbsp;|&nbsp;</span></h2>
            ))}</div>
            <h2 className='text-gray-500'>Opening from {buisness.workingHours}</h2>
        </div>
    </Link>
  )
}

export default BuisnessItem
