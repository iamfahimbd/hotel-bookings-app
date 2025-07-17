import { bookingModel } from "@/components/models/booking-model";
import { hotelModel } from "@/components/models/hotel-model";
import { ratingModel } from "@/components/models/rating-model";
import { reviewModel } from "@/components/models/review-model";
import { usersModel } from "@/components/models/users-model";
import {
  isDateInBetween,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function getAllHotels(destination, checkin, checkout) {
  const regex = new RegExp(destination, "i");
  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  let allHotels = hotelsByDestination;
  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);
        if (found) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }
        return hotel;
      })
    );
  }

  return replaceMongoIdInArray(allHotels);
}

async function findBooking(hotelId, checkin, checkout) {
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return (
      isDateInBetween(checkin, match.checkin, match.checkout) ||
      isDateInBetween(checkout, match.checkin, match.checkout)
    );
  });

  return found;
}

export async function getHotelById(hotelId, checkin, checkout) {
  const hotel = await hotelModel.findById(hotelId).lean();
  if (checkin && checkout) {
    const found = await findBooking(hotelId, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
  return replaceMongoIdInObject(hotel);
}

export async function getRatingsForHotel(hotelId) {
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();

  return replaceMongoIdInArray(ratings);
}

export async function getReviewsForHotel(hotelId) {
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();

  return replaceMongoIdInArray(reviews);
}

export async function getUserByEmail(email) {
  const user = await usersModel.findOne({ email }).lean();

  if (!user) {
    return null;
  }
  console.log("User found: ", user);

  return replaceMongoIdInObject(user);
}

export async function getBookingsByUser(userId){
  const bookings = await bookingModel.find({userId:userId}).lean();
  return replaceMongoIdInArray(bookings);
}
