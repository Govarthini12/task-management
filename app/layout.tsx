// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import Sidebar from "./components/Sidebar/Sidebar";
// import GloabalStyleProvider from "./providers/GlobalStyleProvider";
// import ContextProvider from "./providers/ContextProvider";
// import {ClerkProvider,SignInButton,SignedIn,SignedOut,UserButton} from '@clerk/nextjs';



// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//     <html lang="en">
//       <head>
//           <link
//             rel="stylesheet"
//             href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
//             integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
//             crossOrigin="anonymous"
//             referrerPolicy="no-referrer"
//           />
//         </head>
//       <body>
//         <ContextProvider>
//         <GloabalStyleProvider>
//           <Sidebar />
//           <div className="w-full">{children}</div>
//         </GloabalStyleProvider>
//         </ContextProvider>
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }

//
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import ContextProvider from "./providers/ContextProvider";
import {ClerkProvider,SignInButton,
  SignedIn,
  SignedOut,
  UserButton} from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server";
import NextTopLoader from "nextjs-toploader";

const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {userId}=auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
            integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={nunito.className}>
          <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
                {/* You can conditionally render your Sidebar or other components here */}
              </SignedIn>
              {userId && <Sidebar />}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}