import { usersModel } from "@/components/models/users-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { fname, lname, email, password } = await req.json();
  console.log(fname, lname, email, password);

  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashedPassword,
  };
  try {
    const user = await usersModel.create(newUser);
    return new NextResponse("User registered successfully", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse("User registered Failed!", {
      status: 500,
    });
  }
};
