import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const soge = localFont({
  src: [
    {
      path: "../public/fonts/OVSoge-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OVSoge-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/OVSoge-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/OVSoge-Light.woff",
      weight: "300",
      style: "normal",
    },
  ],
});
const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto", // Define custom variable for Roboto
});
export const metadata = {
  title: "JotDown",
  description: "Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          fontFamily: "var(--font-roboto)",
        },
      }}
    >
      <html lang="en">
        <body className={`${soge.className} ${roboto.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
