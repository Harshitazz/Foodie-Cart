"use client";
import BuisnessList from "./_components/BuisnessList";

import CategoryList from "./_components/CategoryList";
export default function Home() {
  

  return (
    <div className="w-[70%] m-auto">
      <CategoryList />

      <BuisnessList />

    </div>
  );
}
