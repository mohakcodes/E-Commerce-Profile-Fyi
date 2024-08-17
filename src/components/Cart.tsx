"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [user, setUser]: any = useState();
  const [loading, setLoading] = useState(true);

  const [totalItems, setTotalItems] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountedTotal, setDiscountedTotal] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);

  const fetchUser = async () => {
    const userData = await axios.get("/api/auth/refresh");
    setUser(userData.data.data);
    setLoading(false);
    setTotalItems([...Array(userData.data.data.cart.length)].fill(1));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && totalItems.length > 0) {
      const total = user.cart.reduce(
        (a: any, b: any, index: number) => a + b.price * totalItems[index],
        0
      );
      setTotalPrice(total);
      
      // Apply discount if already applied
      if (discountApplied) {
        setDiscountedTotal(total * 0.9); // Apply 10% discount
      } else {
        setDiscountedTotal(total);
      }
    }
  }, [user, totalItems, discountApplied]);

  const handleQuantityChange = (index: number, event: any) => {
    const newQuantity = parseInt(event.target.value);
    const newTotalItems = [...totalItems];
    newTotalItems[index] = newQuantity;
    setTotalItems(newTotalItems);

    // Recalculate the total price and apply discount if already applied
    const total = user.cart.reduce(
      (a: any, b: any, index: number) => a + b.price * newTotalItems[index],
      0
    );
    setTotalPrice(total);
    
    if (discountApplied) {
      setDiscountedTotal(total * 0.9); // Apply 10% discount
    } else {
      setDiscountedTotal(total);
    }
  };

  const removeItem = async (index: number) => {
    const newCart = [...user.cart];
    newCart.splice(index, 1);
    const newTotalItems = [...totalItems];
    newTotalItems.splice(index, 1);
    const newUserData = { ...user, cart: newCart };
    setUser(newUserData);
    setTotalItems(newTotalItems);
    await axios.post("/api/auth/updateuser", { cart: newCart });
  };

  const handleDiscountCode = () => {
    if (discountCode === "SAVE10" && !discountApplied) {
      setDiscountApplied(true);
      setDiscountedTotal(totalPrice * 0.9); // Apply 10% discount
    } else {
      alert("Invalid Discount Code");
    }
  };

  const handlePay = () => {
    alert("Payment successful!");
  };

  if (loading)
    return (
      <div className="flex p-3 text-black font-bold text-xl sm:text-2xl">
        Loading Cart...
      </div>
    );

  return (
    <div className="flex flex-col text-center items-center mb-6">
      <div className='text-black font-bold text-xl pl-3 my-4'>
        <a href="/" className='px-4 py-1 bg-red-400 rounded-lg'>BACK ↩</a>
      </div>
      <div className="w-[70%] lg:w-[55%] flex flex-col">
        <p className="font-bold bg-slate-400 text-3xl text-white mt-2 rounded-md">
          Your Cart
        </p>
        {user === undefined
          ? null
          : user.cart.map((item: any, index: number) => (
              <div
                key={item.id}
                className="border rounded-md p-2 my-2 shadow-md flex md:flex-row flex-col items-center justify-between"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mr-4"
                />
                <div>
                  <h3 className="text-base text-gray-700 font-bold">
                    {item.name}
                  </h3>
                  <p className="text-gray-700">{item.price} RS</p>
                </div>
                <div>
                  <div className="p-1 flex flex-row justify-center gap-2">
                    <div className="text-gray-500">Quantity</div>
                    <select
                      value={totalItems[index]}
                      onChange={(e) => handleQuantityChange(index, e)}
                      className="bg-gray-200 text-gray-600"
                      required
                    >
                      <option value="" disabled>
                        Select Number
                      </option>
                      {[...Array(100)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    onClick={() => removeItem(index)}
                    className="p-1 bg-blue-400 text-white rounded-lg"
                  >
                    <button>Remove</button>
                  </div>
                </div>
              </div>
            ))}
        <p className="font-bold bg-green-500 text-white mt-2 rounded-md">
          Your Total
        </p>
        <div className="py-4">
          <p className="text-gray-700 font-bold">
            Total Items: {totalItems.reduce((a, b) => a + b, 0)}
          </p>
          <p className="text-gray-700 font-bold">Total Price: {totalPrice} RS</p>
          <p className="text-gray-700 font-bold">
            Discounted Total: {discountedTotal.toFixed(2)} RS
          </p>
        </div>
        <div className="my-1">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="EX: SAVE10"
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleDiscountCode}
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Apply Code
          </button>
          {discountApplied && (
            <p className="text-green-700 font-bold mt-2">
              10% discount applied!
            </p>
          )}
        </div>
        <button
          onClick={handlePay}
          className="pay-button p-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
