import Gallery from "@/components/hotel/details/Gallery";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";
import { getHotelById } from "@/database/quires";

export default async function hotelDetailsPage({
  params: { id },
  searchParams: { checkin, checkout },
}) {
  const hotelInfo = await getHotelById(id, checkin, checkout);

  return (
    <>
      <Summary hotelInfo={hotelInfo} checkin={checkin} checkout={checkout} />
      <Gallery gallery={hotelInfo?.gallery} />
      <Overview overview={hotelInfo?.overview} />
    </>
  );
}
