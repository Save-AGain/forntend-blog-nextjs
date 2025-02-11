import "./globals.css";
import "./font.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DefaultSeo } from "next-seo";
import Head from 'next/head';

const defaultSeoConfig = {
  title: "Blog Save AGain",
  description: "This blog covers web development, programming, my hobbies, personal projects, and anything else that interests me.",
  canonical: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
    site_name: "Blog Save AGain",
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <DefaultSeo {...defaultSeoConfig} />
      </Head>
      <body>
        <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 h-screen flex flex-col justify-between font-sans">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
