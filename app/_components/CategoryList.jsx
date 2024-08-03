'use client'
import React, { useEffect, useRef, useState } from 'react'
import { GetCategory } from '../_utils/GlobalApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
function CategoryList() {
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSelectedCategory(params.get('category'))
  }, [params])

  const listRef = useRef(null);
  const scrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, [])

  const getCategoryList = () => {
    GetCategory().then(resp => {
      setCategories(resp.categories);
    })
  }

  return (
    <div className='relative '>
      <div ref={listRef} className='p-4 
      flex gap-7 my-6  no-scrollbar  overflow-auto '>
        {categories && categories.map((category) => (
          <Link href={'?category=' + category.slug} key={category.id}
            className={`p-2 shadow-lg shadow-gray-300 bg-slate-50 flex flex-col items-center  border-2 border-gray-600 rounded-xl
             min-w-32 hover:border-green-600 hover:bg-green-50  cursor-pointer group ${selectedCategory===category.slug && 'border-green-600 bg-green-100'}`}
          >
            <img className="w-44 h-20" src={category.icon?.url} />
            <h2 className='mt-4 group-hover:text-green-600 group-hover:scale-110'>{category.name}</h2>
          </Link>
        ))}
      </div>
      <div>

      </div>
      <FontAwesomeIcon onClick={scrollRightHandler} icon={faGreaterThan} width={20}  className='absolute right-0 bg-gray-100 p-2 rounded-full top-[50%] cursor-pointer' />

    </div>
  )
}

export default CategoryList
