import { bookingModel } from "@/components/models/booking-model";
import { NextResponse,NextRequest } from "next/server";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export const POST = async (request) => {
    const { hotelId, userId, checkin, checkout } = await request.json();
    
    await dbConnect();

    const payload = {
        hotelId: new mongoose.Types.ObjectId(hotelId),
        userId: new mongoose.Types.ObjectId(userId),
        checkin,
        checkout
    };

    try{
        await bookingModel.create(payload);
        return new NextResponse("Booking created successfully", { status: 201 });
    }catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}