'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function PaymentForm({ hotelInfo,loggedInUser, checkin, checkout }) {
  const router = useRouter();
  const [error, setError] = useState(null);

  console.log("PaymentForm checkin: ", checkin);
  console.log("PaymentForm checkout: ", checkout);
  async function onSubmit(e) {
    e.preventDefault();
    

    try{
      const formData = new FormData(e.currentTarget);
    const hotelId = hotelInfo.id;
    const userId = loggedInUser.id;
    const checkin = formData.get("checkin");
    const checkout = formData.get("checkout"); 

    const res = await fetch("/api/auth/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hotelId, userId, checkin, checkout }),
    });

    res.status === 201 && router.push("/bookings");

    }catch(error) {
      setError(error.message);
      console.error("Error during payment submission:", error);

    }
  }
  return (
    <form className="my-8" onSubmit={onSubmit} >
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={loggedInUser?.name || ""}
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={loggedInUser?.email || ""}
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input type="date" value={checkin} name="checkin" id="checkin" />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input type="date" value={checkout} name="checkout" id="checkout" />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Pay Now ($10)
      </button>
    </form>
  );
}
