import Gallery from "@/components/hotel/details/Gallery";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";
import { getHotelById } from "@/database/quires";
import { get } from "mongoose";

export default async function hotelDetailsPage({params:{id}}){
    const hotelInfo =await getHotelById(id);
    console.log(hotelInfo);
    return (
        <>
        <Summary hotelInfo={hotelInfo}  />
        <Gallery gallery={hotelInfo?.gallery} />
        <Overview overview={hotelInfo?.overview}/>
        </>
    );
}