'use client'
const { default: Header } = require("./_components/Header");
import React, { useState } from "react";
import { CartUpdateContext } from "./_context/CartUpdateContext";
import { Toaster } from "@/components/ui/sonner";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({children}){
    const [updateCart, setUpdateCart]=useState(false);
    return (
        <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_NEXT_PAYPAL_CLIENT_ID}}>
        <CartUpdateContext.Provider value={{updateCart, setUpdateCart}}>
        <div>
            <Header/>
            <Toaster />
            {children}
        </div>
        </CartUpdateContext.Provider>
        </PayPalScriptProvider>
    )
}

export default Provider