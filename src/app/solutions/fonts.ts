import localFont from "next/font/local";

export const manrope = localFont({
    src: "./fonts/manrope-latin.woff2",
    weight: "700 800",
    display: "swap",
    variable: "--font-corp-manrope",
});

export const inter = localFont({
    src: "./fonts/inter-latin.woff2",
    weight: "400 600",
    display: "swap",
    variable: "--font-corp-inter",
});
