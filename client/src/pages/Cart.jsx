import React from "react";
import Header from "../components/Header";

const Cart = () => {
  return (
    <>
      <Header />
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-[#1C1C1C]">My Cart</h1>
        <p className="text-[#505050] mt-4">Your cart page content goes here.</p>
      </div>
    </>
  );
};

export default Cart;
