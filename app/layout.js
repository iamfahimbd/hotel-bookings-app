import Navbar from "@/components/Navbar";
import { dbConnect } from "@/service/mongo";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
   title: "Stay Swift",
  description: "A Booking Web App",
};

export default async function Layout({ children }) {
  await dbConnect();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar sideMenu={true} />
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
