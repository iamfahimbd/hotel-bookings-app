import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "./auth/Logout";

export default async function Navbar({ sideMenu }) {
  const session = await getServerSession(authOptions);
  return (
    <nav>
      <Link href="/">
        <Image
          src="/stayswift.svg"
          alt="Stay Swift Logo"
          srcset=""
          height={200}
          width={200}
        />
      </Link>

      {sideMenu && (
        <ul>
          <li>
            <Link href="#">Recommended Places</Link>
          </li>

          <li>
            <Link href="#">About Us</Link>
          </li>

          <li>
            <Link href="#">Contact us</Link>
          </li>

          <li>
            <Link href="/bookings">Bookings</Link>
          </li>

          <li>
            {
              session?.user ? (
                <div>
                  {session?.user?.name} 
                  <span> | </span>
                  <Logout />
                </div>
              ) :(<Link href="/login" className="login">
                  Login
                </Link>)
            }
                
             
              
            
          </li>
        </ul>
      )}
    </nav>
  );
}
