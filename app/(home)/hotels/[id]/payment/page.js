import PaymentForm from "@/components/payment/PaymentForm";
import { getHotelById, getUserByEmail } from "@/database/quires";
import { auth } from "@/lib/auth";
import { getDayDifference } from "@/utils/data-util";
import { redirect } from "next/navigation";

export default async function Payment({ params: { id }, searchParams }) {
  const { checkin, checkout } = searchParams;
  const authUser = await auth();
  if (!authUser) {
    redirect("/login");
  }

  const session = await auth();
  const loggedInUser = await getUserByEmail(session.user.email);
  if (!loggedInUser) {
    console.error(" user found with email:", session.user.email);
    return;
  }
  const hotelInfo = await getHotelById(id, checkin, checkout);
  if (!hotelInfo) {
    throw new Error(`Hotel not found for id: ${id}`);
  }
  let cost = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2;
  const hasCheckinCheckout = checkin && checkout;

  if (hasCheckinCheckout) {
    const days = getDayDifference(checkin, checkout);
    cost = cost * days;
  }

  console.log("Hotel ID payment: ", id);
  console.log("checkin hobe payment: ", checkin);
  console.log("checkout hobe payment: ", checkout);

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotelInfo?.name}</b> and total price is{" "}
          <b>${cost}</b> for{" "}
          <b>{hasCheckinCheckout && getDayDifference(checkin, checkout)}</b>{" "}
          days
        </p>
        <PaymentForm
          loggedInUser={loggedInUser}
          hotelInfo={hotelInfo}
          checkin={checkin}
          checkout={checkout}
        />
      </div>
    </section>
  );
}
