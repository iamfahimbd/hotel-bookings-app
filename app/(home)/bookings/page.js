import ProfileInfo from "@/components/user/ProfileInfo";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function BookingPage() {
    const authUser = await auth();
    if (!authUser) {
        redirect('/login');
    }
  return (
      <>
            <section className="mt-[100px]">
                <div className="container">
                    <ProfileInfo />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PastBooking />
                        <UpcomingBooking />
                    </div>
                </div>
            </section>
        </>
  )
}
