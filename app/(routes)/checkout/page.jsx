'use client'
import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import { createNewOrder, GetUserCart, updateOrderItems } from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../_components/CartIcon';
import { toast } from 'sonner';
import { Result } from 'postcss';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter()
    const params = useSearchParams();
    const { user } = useUser();
    const [cart, setCart] = useState([]);
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalBill, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (user) {
            getCart();
        }

    }, [user, updateCart]);
    

    const getCart = () => {
        GetUserCart(user?.emailAddresses[0].emailAddress, params.get('business'))
            .then(resp => {
                setCart(resp?.userCarts);
                totalPrice(resp?.userCarts);
                console.log(resp)
                console.log(user)
                console.log(updateCart)

            })
            .catch(err => {
                console.error("Failed to fetch cart", err);
            });
    };

    const deliveryCharge = 15;
    const totalPrice = (cart_) => {
        let total = 0;
        cart_.forEach(item => {
            total += item.price;
        });
        setSubTotal(total);
        setTax(total * 0.07);
        setTotal(total + total * 0.07 + deliveryCharge);
    };

    const aggregatedCart = cart.reduce((acc, item) => {
        const found = acc.find(i => i.productName === item.productName);
        if (found) {
            found.count += 1;
        } else {
            acc.push({ ...item, count: 1 });
        }
        return acc;
    }, []);
    
    const addToOrder = (billingDetails) => {
        setLoading(true);
        console.log('Phone:', phone);
        // if(!(address||phone||zip)){
        //     toast("fields empty")
        //     return
        // }
        const data = {
            email: user?.emailAddresses[0].emailAddress,
            orderAmount: totalBill,
            restroName: params.get('business'),
            address: billingDetails.address || address,
            phone: phone,
            userName: user.fullName,
            zipCode: billingDetails.zip || zip,

        };

        createNewOrder(data).then(resp => {
            const resultId = resp?.createOrder?.id;
            if (resultId) {
                aggregatedCart.forEach((item) => {
                    updateOrderItems(item.productName, item.count,item.price, resultId, user?.emailAddresses[0].emailAddress)
                        .then(result => {
                            console.log(result)
                            setLoading(false)
                            toast('order created')
                            setUpdateCart(!!!updateCart)
                            SendEmail()
                            router.replace('/confirmation')
                            // setsubmit(true)
                        }, (error) => {
                            console.log('eerfrenffdfndr')
                            setLoading(false)
                        })

                })
            }
        }, (error) => {
            setLoading(false)
        });
    };

    const SendEmail = async () => {
        try {
            if (!user || !user.emailAddresses || !user.emailAddresses[0].emailAddress) {
                toast('User email address is not available');
                return;
            }

            const emailAddress = user.emailAddresses[0].emailAddress;
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: emailAddress })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from server:', errorText);
                toast('Error while sending email');
            } else {
                console.log('done')
                toast('Email sent successfully');
            }
        } catch (err) {
            console.error('Error while sending email:', err);
            toast('Error while sending email');
        }
    };

    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            const billingDetails = {
                address: details.purchase_units[0].shipping.address.address_line_1,
                zip: details.purchase_units[0].shipping.address.postal_code
            }
            addToOrder(billingDetails);
            console.log(billingDetails.address)
            console.log(billingDetails.zip)
        });

    };

    return (
        <div>
            <h2 className='font-bold text-2xl my-5'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3'>
                <div className='md:col-span-2 mx-8'>
                    <h2 className='text-3xl font-bold'>Billing Details</h2>
                    <div className='grid grid-cols-2 gap-10 mt-3'>
                        <input
                            placeholder='Name'
                            onChange={e => setName(e.target.value)}
                            className='w-full rounded border border-[#e0e0e0] bg-white p-2'
                        />
                        <input
                            placeholder='Email'
                            onChange={e => setEmail(e.target.value)}
                            className='w-full rounded border border-[#e0e0e0] bg-white p-2'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-10 mt-3'>
                        <input
                            placeholder='Phone'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className='w-full rounded border border-[#e0e0e0] bg-white p-2'
                        />
                        <input
                            placeholder='ZIP'
                            onChange={e => setZip(e.target.value)}
                            className='w-full rounded border border-[#e0e0e0] bg-white p-2'
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            placeholder='Address'
                            onChange={e => setAddress(e.target.value)}
                            className='w-full rounded border border-[#e0e0e0] bg-white p-2'
                        />
                    </div>
                </div>

                <div className='mx-10 border'>
                    <h2 className='bg-gray-200 p-3 font-bold text-lg text-center'>Total Cart - {cart.length} items</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-semibold flex justify-between'>SubTotal: <span>&#8377;{subTotal.toFixed(2)}</span></h2>
                        <hr />
                        <h2 className='flex justify-between'>Delivery: <span>&#8377;{deliveryCharge}</span></h2>
                        <h2 className='flex justify-between'>Tax (7%): <span>&#8377;{tax.toFixed(2)}</span></h2>
                        <hr />
                        <h2 className='font-semibold flex justify-between'>Total: <span>&#8377;{totalBill.toFixed(2)}</span></h2>
                        <button onClick={() => addToOrder({})} className='bg-red-500 p-1 text-lg w-full'>
                           Cash On Delivery
                        </button>

                        {totalBill > 15 && <PayPalButtons
                            disabled={!(name && email && address && zip) || loading}
                            style={{ layout: "horizontal" }}
                            onApprove={handleApprove}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalBill.toFixed(2),
                                                currency_code: 'USD',
                                            }
                                        }
                                    ]
                                })
                            }}
                        />}
                    </div>
                </div>
            </div>

            <CartIcon cart={cart} />
        </div>
    );
}

export default Page;
