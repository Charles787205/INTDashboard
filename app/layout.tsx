import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Provider } from "@/components";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

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
import { SidePanel } from "@/components";
export const metadata: Metadata = {
  title: "INT Dashboard",
  description: "A dashboard for INT admins",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  let bodyClass = `${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100`;
  let isSignedIn = false;

  if (session && session.user) {
    isSignedIn = true;
    bodyClass += " flex p-[10px] gap-[10px] w-full";
  } else {
    isSignedIn = false;
  }
  console.log(`${session}, HELLOOOO`);

  return (
    <html lang="en">
      <body className={bodyClass}>
        <Provider>
          {isSignedIn && <SidePanel />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
