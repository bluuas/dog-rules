import { Quattrocento, Quattrocento_Sans } from "next/font/google";

export const quattrocento = Quattrocento({
  variable: "--font-quattrocento",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const quattrocentoSans = Quattrocento_Sans({
  variable: "--font-quattrocento-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});
