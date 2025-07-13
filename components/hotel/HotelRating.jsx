import { getRatingsForHotel } from "@/database/quires"
import { get } from "mongoose"


export default async function HotelRating({ id }) {
    const ratings = await getRatingsForHotel(id);

    const getRatingDescription = (avgRating) => {
        if (avgRating === 0) {
            return "No Ratings Yet";
        } else if(avgRating>0 && avgRating <= 2) {
            return "Poor";

        } else if(avgRating>2 && avgRating <= 3) {
            return "Average";
        }   else if(avgRating>3 && avgRating <= 4) {
            return "Good";
        } else if(avgRating>4 && avgRating <= 5) {
            return "Excellent";
        }
    }

    let avgRating = 0;

    if (ratings.length === 1) {
        avgRating = ratings[0].rating;
    }

    if (ratings.length > 1) {
        avgRating = ratings.reduce((item,currenValue)=>{
            return item + currenValue.rating;
        }) / ratings.length;
    }

  return (
    <>
    <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
            {avgRating}
          </div>
          <span className="font-medium">{getRatingDescription(avgRating)}</span>
    </>
  )
}
