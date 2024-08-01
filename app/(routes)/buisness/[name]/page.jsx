'use client'
import React, { useContext, useEffect, useState } from 'react'
import { GetBuiesnessDetails, GetUserCart } from '../../../_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import Intro from '../_components/Intro'
import Tabs from '../_components/RTabs'

import { CartUpdateContext } from '@/app/_context/CartUpdateContext'
import { useUser } from "@clerk/clerk-react";

import CartIcon from '../../_components/CartIcon'

function Page() {
    const { user ,isLoaded} = useUser();
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const [cart, setCart] = useState([])
    const [restro, setRetro] = useState([]);
    const param = usePathname();

    useEffect(() => {
        if (param) {
            GetRestroDetails(param.split('/')[2]);
            
        }
        
    }, [param]);

    

    useEffect(() => {
        
        if (user) {
            getCart();
        }

    }, [updateCart , user ]);
    

    const getCart = () => {
        
            GetUserCart(user?.emailAddresses[0].emailAddress,param.split('/')[2] ).then(resp => {
                console.log(resp)
                console.log(user)
                console.log(updateCart)
                setCart(resp?.userCarts);
                
            }).catch(err => {
                console.error("Failed to fetch cart", err);
            });
        
    }

    const GetRestroDetails = (buisnessSlug) => {
        GetBuiesnessDetails(buisnessSlug).then(resp => {
            
            setRetro(resp.restro);
        });
    };

    // Callback function to update cart count

    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    return (
        <div className='w-[90%] md:w-[70%] m-auto '>
            <Intro restaurant={restro} />
            <Tabs restaurant={restro} />
            {/* Floating Cart Icon */}
            <CartIcon cart={cart}/>
                

            
        </div>
    );
}

export default Page;
