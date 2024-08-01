

import React, { useEffect, useState } from 'react';
import { getTopRestros } from '../_utils/GlobalApi';
import { useSearchParams } from 'next/navigation';
import BuisnessItem from './BuisnessItem'
import  Skeleton from '../_utils/Skeleton';
const BuisnessList = () => {
  const [buisnessList, setBuisnessList] = useState([]);
  const params=useSearchParams();
    const [category,setCategory]=useState('all')
    const [loading,setLoading]=useState(false);

    
    useEffect(()=>{
      if(!params.get('category')){
        getBuisnessList('all')
       }else{
        params && setCategory(params.get('category'))
        params && getBuisnessList(params.get('category'))
       }
        
    },[params])

   

  const getBuisnessList=(c)=>{
    setLoading(true)
    getTopRestros(c).then(resp=>{
      console.log(resp)
      setBuisnessList(resp)
      setLoading(false)
    })
  }

  return (
    <div className='mt-5'>
      <h1 className='font-bold text-2xl'>Top {category} Restaurants</h1>
      <h2 className='font-bold text-primary'>{buisnessList?.length} founds</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3'>
        {!loading?buisnessList.map((r,i)=>(
          <BuisnessItem key={i} buisness={r}/>
        )):
          [1,2,3,4,5,6,7,8].map((item,index)=>(
            <Skeleton key={index}/>
          ))
          }
      </div>
    </div>
  );
};

export default BuisnessList;

