//port type { Metadata } from "next";
//port { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function RootLayout({ children }) {
  
  //const geistMono = Geist_Mono({ subsets: ["latin"] });

  return (
    <html lang="es">
      <head>
        <title>Panel Urbano Reactivo</title>
      </head>
      <body>
       <Header />

        {children}

        <Footer />
      </body>


    </html>
  );
}