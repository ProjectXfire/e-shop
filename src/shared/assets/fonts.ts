import { Montserrat_Alternates, Nosifer } from "next/font/google";

export const primaryFont = Montserrat_Alternates({
  variable: "--font-primary",
  weight: ["100", "200", "400", "500", "800"],
  subsets: ["latin"],
});

export const errorFont = Nosifer({
  variable: "--font-error",
  weight: ["400"],
  subsets: ["latin"],
});
