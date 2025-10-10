import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Nunito } from "next/font/google";
import { Public_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { Outfit } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const outfit = Outfit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const publicSans = Public_Sans({ subsets: ["latin"] });

export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const nunito = Nunito({
  weight: "700",
  subsets: ["latin"],
});
