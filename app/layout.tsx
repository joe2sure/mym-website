import type { Metadata } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth/auth-context";
import { VisitTracker } from "@/components/analytics/visit-tracker";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meet Your Match — Matchmaking, made honest",
  description:
    "Meet Your Match pairs a compatibility engine with real human intent — verified people, fewer dead-end chats, and a path from first message to first date. See the product and the opportunity.",
  keywords: ["dating app", "matchmaking", "Meet Your Match", "compatibility", "relationships"],
  openGraph: {
    title: "Meet Your Match — Matchmaking, made honest",
    description:
      "A compatibility engine built on real signal, not endless swiping. Explore the product, the traction, and the opportunity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>
        <AuthProvider>
          <VisitTracker />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}




// import type { Metadata } from "next";
// import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
// import "./globals.css";

// const fraunces = Fraunces({
//   subsets: ["latin"],
//   variable: "--font-fraunces",
//   axes: ["opsz", "SOFT", "WONK"],
//   style: ["normal", "italic"],
//   display: "swap",
// });

// const manrope = Manrope({
//   subsets: ["latin"],
//   variable: "--font-manrope",
//   weight: ["400", "500", "600", "700", "800"],
//   display: "swap",
// });

// const plexMono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   variable: "--font-plex-mono",
//   weight: ["400", "500"],
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Meet Your Match — Matchmaking, made honest",
//   description:
//     "Meet Your Match pairs a compatibility engine with real human intent — verified people, fewer dead-end chats, and a path from first message to first date. See the product and the opportunity.",
//   keywords: ["dating app", "matchmaking", "Meet Your Match", "compatibility", "relationships"],
//   openGraph: {
//     title: "Meet Your Match — Matchmaking, made honest",
//     description:
//       "A compatibility engine built on real signal, not endless swiping. Explore the product, the traction, and the opportunity.",
//     type: "website",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable}`}>
//       <body>{children}</body>
//     </html>
//   );
// }
