"use client";
import { useState } from "react";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantLogin from "../_components/RestaurantLogin";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  
  return (
    <>
    <div className="text-center pb-4">
      {login ? <RestaurantLogin/> : <RestaurantSignup />}

      <button onClick={() => setLogin(!login)} className="text-blue-500 mb-8">
        {login
          ? "Do not have account? Signup"
          : "Already have an Account? Login"}
      </button>
    </div>
    </>
  );
};

export default Restaurant;
