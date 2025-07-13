import { getReviewsForHotel } from "@/database/quires";

export default async function HotelReviewsPage({ params }) {
  const hotelId = params.id;
  const reviews = await getReviewsForHotel(hotelId);
  console.log(reviews);
  return (
    <>
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Reviews</h1>
       {reviews.length === 0 ? (
        <p>No Review Yet</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review?.review}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
     
    </>
  );
}
