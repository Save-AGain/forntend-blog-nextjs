import SocialIcon from '@/components/social-icons'
import Image from 'next/image';


export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Section 1: Banner Image for Desktop */}
            <div className="relative w-full hidden md:flex items-center justify-center h-64 md:h-96">
                <Image
                    src="/banner-desktop.png"
                    alt="About Cover"
                    width={850}
                    height={380}
                    className="w-full h-full object-cover object-center rounded-lg shadow-md"
                    priority={false} // เปิด Lazy Load
                />
                <div className="absolute left-6 top-6 md:left-12 md:top-12 bg-black bg-opacity-60 p-4 rounded-lg">
                    <h1 className="text-2xl md:text-4xl font-bold">Save AGain</h1>
                    <p className="text-sm md:text-lg mt-2">คนธรรมดาที่มีความฝัน</p>
                </div>
            </div>

            <div className="mt-6 space-x-4 hidden md:flex">
                <SocialIcon kind="instagram" href="https://www.instagram.com/gain2re/" size={6} />
                <SocialIcon kind="youtube" href="https://www.youtube.com/@gain2re146" size={6} />
                <SocialIcon kind="github" href="https://github.com/Save-AGain" size={6} />
            </div>

            {/* Section 1: Banner Image for Mobile */}
            <div className="w-full flex flex-col items-center md:hidden">
                <div className="w-full h-full max-h-[400] max-w-[400] aspect-square flex items-center justify-center">
                    <Image
                        src="/banner-mobile.png"
                        alt="About Cover Mobile"
                        layout="responsive"
                        width={400}
                        height={400}
                        className="w-full h-full max-h-[400] max-w-[400] object-cover object-center rounded-lg shadow-md"
                        priority={false} // เปิด Lazy Load
                    />
                </div>
                <div className="mt-4 text-center">
                    <h1 className="text-xl font-bold t">Save AGain</h1>
                    <p className="text-sm  mt-1">คนธรรมดาที่มีความฝัน</p>
                    <div className="mt-6 flex space-x-4 justify-center">
                        <SocialIcon kind="instagram" href="https://www.instagram.com" size={6} />
                        <SocialIcon kind="youtube" href="https://www.youtube.com" size={6} />
                        <SocialIcon kind="github" href="https://www.github.com" size={6} />
                    </div>

                </div>
            </div>

            {/* Section 3: Description */}
            <section className="mt-8 text-center">
                <h2 className="text-3xl font-bold">About Me</h2>
                <p className="mt-4">
                    ผมชื่อเกน ผมสร้างบล็อกนี้ขึ้นมาเพราะอยากแชร์เรื่องที่ตัวเองชอบและงานอดิเรก ไม่ว่าจะเป็นหนังสือ, การถ่ายรูป, เกม, การ์ตูน, โค้ด และอีกหลายอย่าง
                    ตอนนี้มีหลายโปรเจกต์ที่กำลังทำอยู่ เช่น แต่งหนังสือ, ลองเล่นกับ 3D Printer แถมยังมีไอเดียอีกเพียบ ตั้งแต่โปรเจกต์เกี่ยวกับ AI
                    ไปจนถึงงานฝีมือและ DIY ต่างๆ
                </p>
                <p className="mt-4">
                    เนื้อหาของบล็อกนี้จะเป็นเรื่องที่ผมสนใจตามใจตัวเอง แต่ก็คงวนเวียนอยู่กับสิ่งที่ชอบเป็นหลัก
                    แล้วด้วยความที่เป็นสายชอบซื้อของ เลยมีของให้หยิบมารีวิวอยู่เรื่อยๆ หวังว่าจะถูกใจกันนะ
                </p>
            </section>
        </div>
    );
}
