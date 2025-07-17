import { getAllHotels } from "@/database/quires";
import HotelCard from "./HotelCard";

export default async function HotelList({ destination, checkin, checkout }) {
  const allHotels = await getAllHotels(destination, checkin, checkout);
  console.log("allHotels in HotelList: ", allHotels);
  console.log("checkin in HotelList: ", checkin);
  console.log("checkout in HotelList: ", checkout);
  return (
    <>
      <div className="col-span-9">
        <div className="space-y-4">
          {allHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotelInfo={hotel}
              checkin={checkin}
              checkout={checkout}
            />
          ))}
        </div>
      </div>
    </>
  );
}
