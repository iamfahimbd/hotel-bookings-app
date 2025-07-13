
import { auth } from "@/lib/auth";
import Image from "next/image";


export default async function ProfileInfo() {

  const session = await auth();
  const user = session?.user;
  
  



  return(
     <div className="flex flex-col items-center py-8 text-center">
      <div className="relative max-h-[180px] max-w-[180px] rounded-full lg:mb-8 h-[100px] w-[100px] bg-orange-600 grid place-items-center text-4xl text-white">
        {
          user?.image ?(
            <Image
              src={user.image}
              alt="User Profile Image"
              width={180}
              height={180}
              className="rounded-full object-cover"
            />
          ) : (
            user?.name?.charAt(0).toUpperCase() || 'U' // Fallback to first letter of name or 'U'
          )
        }
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold lg:text-[28px]">{user?.name}</h3>
        <p className="leading-[231%] lg:text-lg">{user?.email}</p>
      </div>

      <div className="w-3/4 border-b border-[#a4a4a4] py-6 lg:py-4"></div>
    </div>
  );
}
