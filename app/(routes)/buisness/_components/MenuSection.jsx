import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import { AddToCart } from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useUser } from "@clerk/clerk-react";
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';



function MenuSection({ restaurant }) {
    const { user } = useUser();
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        if (restaurant?.menu) {
            FilterMenu(restaurant.menu[0]?.category);
        }
    }, [restaurant]);

    const FilterMenu = (category) => {
        const result = restaurant?.menu?.filter((item) => item.category === category);
        setMenu(result[0]);
    };

    const addToCart = (item) => {
        // if (!isLoaded || !user || !user.primaryEmailAddress) {
        //     console.log("User data is not loaded or available yet");
        //     return;
        // }

        const data = {
            email: user.primaryEmailAddress.emailAddress,
            name: item.name,
            description: item.description,
            productImage: item.productImage?.url,
            price: item.price,
            slug: restaurant.slug
        };

        AddToCart(data).then(resp => {
            setUpdateCart(!updateCart); // Toggle updateCart to trigger re-fetch
            toast('added')
        }).catch(err => {
            console.error("Failed to add item to cart", err);
        });
    };

   

    if (!user || !user.primaryEmailAddress) {
        return <div>User data is not available</div>;
    }

    return (
        <div className='grid grid-cols-4 mt-2'>
            <div className='hidden md:flex flex-col mr-10 gap-2'>
                {restaurant?.menu?.map((r, i) => (
                    <Button key={i} onClick={() => FilterMenu(r.category)} variant="ghost" className='flex justify-start hover:bg-slate-50'>{r.category}</Button>
                ))}
            </div>
            <div className='md:col-span-3 col-span-4'>
                <h2 className='font-extrabold text-lg'>{menu?.category}</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 w-full m-auto items-center group hover:cursor-pointer'>
                    {menu?.menuItem?.map((item, index) => (
                        <div onClick={() => addToCart(item)} key={index} className='p-2 m-2 hover:bg-slate-50'>
                            <img className="w-[120px] h-[120px] object-cover rounded-lg group-hover:scale-105 " src={item?.productImage?.url}></img>
                            <div className='flex justify-between my-4'>
                                <h2 className="font-bold">{item.name}</h2>
                                <h2 className='mr-4'>{item.price}</h2>
                            </div>
                            <h2 className='text-sm text-gray-300 line-clamp-3'>{item.description}</h2>
                            <FontAwesomeIcon icon={faSquarePlus} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuSection;
