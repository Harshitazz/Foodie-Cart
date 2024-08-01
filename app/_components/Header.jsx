'use client'
import { faBagShopping, faBorderAll, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, useClerk, UserButton, useUser } from '@clerk/nextjs'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header() {
    const [details, setDetails] = useState(false);
    const { signOut } = useClerk();
    const { user } = useUser()

    useEffect(() => {
        const data = localStorage.getItem("restaurantId");
        if (data) {
            setDetails(true);
        }
    }, []);

    const handleSignOut = async () => {
        localStorage.removeItem("restaurantId");
        await signOut();

    };

    return (
        <div className="flex justify-between items-center bg-reddish-50 px-1 sm:px-6 py-1 shadow-md">
            <div className='flex gap-4 '>
                <div className=' p-1 text-black items-center flex gap-2'>
                    <img className="w-12 " src="/logo.png" />
                    <span className='text-3xl text-green-700 font-bold font-serif'>Foodiees</span>
                </div>

            </div>

            <div className='flex gap-2 hidden sm:flex border p-2 rounded-lg bg-gray-200 w-80 justify-evenly items-center'>
                <input type='text' placeholder='search' className="bg-transparent" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />

            </div>


            <ul className="flex items-center justify-center gap-2">


                <SignedOut className='gap-2 flex'>
                    {/* <li className=' rounded-lg  hover:scale-110 flex border-2 py-2 px-2'>

                        <SignInButton mode='modal'>
                            
                            <button>Login</button>
                        </SignInButton>
                    </li> */}
                    <li className=' rounded-lg  hover:scale-105 flex bg-gray-200 py-2 px-2'>


                        <SignUpButton mode='modal'  >

                            <button >sign up</button>

                        </SignUpButton>
                    </li>
                </SignedOut>
                <SignedIn>

                    {details ? <div>
                        <Link href={"/restaurant"} className='p-2 mx-2 cursor-pointer hover:scale-105 rounded-full border-2 border-customDark'>complete your restaurant details.</Link>
                    </div> :
                        <div>
                            <Link href={"/restaurant"} className='p-2 mx-2 cursor-pointer hover:scale-105 rounded-full border-2 border-customDark'>register your restaurant</Link>
                        </div>}
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger><img src={user?.imageUrl} width={30} className='rounded-full' alt="user" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent >
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={'/users'}><DropdownMenuItem className='cursor-pointer hover:bg-slate-100'>Profile</DropdownMenuItem></Link>
                            <Link href={'/users#/my-orders'}><DropdownMenuItem className='cursor-pointer hover:bg-slate-100'>My Orders</DropdownMenuItem></Link>
                            <DropdownMenuItem className='cursor-pointer hover:bg-slate-100'><button onClick={handleSignOut}>Logout</button></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </SignedIn>


            </ul>
        </div>
    )
}

export default Header
