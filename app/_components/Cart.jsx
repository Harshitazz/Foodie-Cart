import { X } from 'lucide-react'
import React, { useContext } from 'react'
import { DisconnectRestroFromUserCart } from '../_utils/GlobalApi';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import Link from 'next/link';

function Cart({cart}) {
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const CalTotalAmount=()=>{
        let total=0;
        cart.forEach(element => {
            total=total+element.price
        });
        return total.toFixed(2);
    }
    const RemoveItemFromCart=(id)=>{
        DisconnectRestroFromUserCart(id).then(resp=>
            setUpdateCart(!updateCart)
            
        ).catch(err=>
            console.log("failed to delete from cart",err)
        )
    }
  return (
    <div >
      <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
      <div className='mt-5 flex flex-col gap-3'>
        <h2 className='font-semibold'>My Order</h2>
        {cart&& cart.map((item,index)=>(
            <div key={index} className='flex justify-between items-center'>
                <h2 className='text-sm'>{item?.productName}</h2>
                <h2 className='flex gap-2 items-center'>&#8377;{item?.price}
                <X className='h-4 w-4 text-red-500' onClick={()=>RemoveItemFromCart(item.id)}/>
                </h2>
                
            </div>
        ))}
        <Link href={'/checkout?business='+cart[0]?.restaurant?.slug} className='w-full'>
        <button  className='bg-red-500 p-1 text-lg w-full' >CheckOut  &#8377;{CalTotalAmount()}</button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
