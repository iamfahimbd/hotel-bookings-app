import { getAllHotels } from "@/database/quires";
import HotelCard from "./HotelCard";

export default async function HotelList() {
  const allHotels = await getAllHotels();
  console.log(allHotels);
  return (
    <>
      <div className="col-span-9">
        <div className="space-y-4">
          {
            allHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotelInfo={hotel}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}
