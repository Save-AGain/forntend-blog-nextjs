import "@/components/backend";
import BlogCarousel from "@/components/Carousel/BlogCarousel"
import ProjcetCarousel from "@/components/Carousel/ProjcetCarousel"
import ReviewCarousel from "@/components/Carousel/ReviewCarousel"
import Image from 'next/image';

export default async function Home() {
  return (
    <div className="w-full py-12 pt-3 sm:pt-6 md:pt-12">
      {/* Section 1: Banner Image for Desktop */}
      <div className="relative w-full hidden md:flex items-center justify-center h-96 md:h-128">
        <Image
          src="/banner2-desktop.jpg"
          alt="About Cover"
          width={1200}
          height={400}
          className="w-full h-full object-cover object-center"
          priority // ✅ เปิด Lazy Load
        />
        <div className="absolute left-6 top-6 md:left-12 md:top-12 bg-black bg-opacity-70 p-4 rounded-lg xl:max-w-[540] max-h-[190] max-w-[440]">
          <h1 className="text-2xl md:text-4xl font-bold">Save AGain</h1>
          <p className="text-sm md:text-lg mt-2">สวัสดีครับทุกท่าน ผมชื่อเกน ผมสร้าง blog นี้ขึ้นมาเพื่อแชร์ความชอบ, งานอดิเรก, โปรเจคและเรื่องราวต่างๆ หวังว่าทุกๆคนจะชอบกันนะ</p>
        </div>
      </div>

      {/* Section 1: Banner Image for Mobile */}
      <div className="w-full flex flex-col items-center md:hidden">
        <div className="w-full h-full max-h-[400] max-w-[400] aspect-square flex items-center justify-center">
        <Image
          src="/banner2-mobile.jpg"
          alt="About Cover"
          layout="responsive" 
          width={400}
          height={400}
          className="object-cover object-center"
          priority // ✅ เปิด Lazy Load
        />
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-xl font-bold t">Save AGain</h1>
          <p className="text-sm  mt-1">สวัสดีครับทุกท่าน ผมชื่อเกน ผมสร้าง blog นี้ขึ้นมาเพื่อแชร์ความชอบ, งานอดิเรก, โปรเจคและเรื่องราวต่างๆ หวังว่าทุกๆคนจะชอบกันนะ</p>
        </div>
      </div>
      <div className="mt-4">
        <br />
        <BlogCarousel />
        <div className="text-right mt-4 text-base font-medium leading-6">
          <a
            href={`blogs/`}
            className="text-gray-300 hover:text-blue-800 transition-all"
          >
            Read more &rarr;
          </a>
        </div>
      </div>
      <div className="mt-4">
        <br />
        <ProjcetCarousel />
        <div className="text-right mt-4 text-base font-medium leading-6">
          <a
            href={`tags/cmq36n38rd6dk0cqbzb1qqz7`}
            className="text-gray-300 hover:text-blue-800 transition-all"
          >
            Read more &rarr;
          </a>
        </div>
      </div>
      <div className="mt-4">
        <br />
        <ReviewCarousel />
        <div className="text-right mt-4 text-base font-medium leading-6">
          <a
            href={`tags/rhf5g4ean1cdawyq1vrcd41u`}
            className="text-gray-300 hover:text-blue-800 transition-all items-end mt-4"
          >
            Read more &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
