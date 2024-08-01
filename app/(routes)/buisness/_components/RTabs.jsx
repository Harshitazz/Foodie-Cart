import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'
import MenuSection from "./MenuSection"
import ReviewSection from "./ReviewSection"

function RTabs({restaurant}) {
  return (
    <div className='m-4 flex justify-center'>

    <Tabs defaultValue="category" className="w-full p-6 ">
      <TabsList className="bg-slate-200 ">
        <TabsTrigger className='border-2 hover:rounded hover:border-black' value="category">Category</TabsTrigger>
        <TabsTrigger className='border-2 hover:rounded hover:border-black' value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="category"><MenuSection restaurant={restaurant}/></TabsContent>
      <TabsContent value="reviews"><ReviewSection restaurant={restaurant}/></TabsContent>
    </Tabs>
</div>
  )
}

export default RTabs

