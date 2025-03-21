"use client"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/components/backend";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from 'next/image';

const ReviewCarousel = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const tagId = "rhf5g4ean1cdawyq1vrcd41u";
    useEffect(() => {
        async function fetchBlogs() {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/blogs?filters[tags][documentId][$eq]=${tagId}&pagination[page]=1&pagination[pageSize]=5&populate=Images_cover&populate=tags`);
            const data = await res.json();

            setBlogs(data.data);
        }

        fetchBlogs();
    }, []);

    return (
        <div className="blog-carousel">
            <h1 className="text-3xl leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mt-5 mb-3" style={{ color: 'var(--color-accent)' }}>
                Review 
            </h1>
            <h3 className="text-lg md:text-2xl text-gray-500 border-b border-[#2c3e50] pb-4 mb-5">Blog เกี่ยวกับการรีวิวของหรืออื่นๆ</h3>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {blogs?.map((blog) => (
                    <SwiperSlide key={blog.id}>
                        <div className="blog-card">
                            <a href={`blogs/${blog.documentId}`}>
                                <Image
                                    className="object-cover transform transition duration-300 hover:scale-105 rounded-lg"
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${blog.Images_cover?.url}`}
                                    alt={blog.Images_cover.alternativeText}
                                    layout="responsive"
                                    width={400}
                                    height={400}
                                    priority={false} 
                                    placeholder="blur" 
                                    blurDataURL={`data:image/svg+xml;base64,${btoa(`
                                        <svg fill="#6b97ff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)" stroke="#6b97ff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_2_"> <path id="XMLID_4_" d="M97.5,165c0-8.284-6.716-15-15-15h-60c-8.284,0-15,6.716-15,15s6.716,15,15,15h60 C90.784,180,97.5,173.284,97.5,165z"></path> <path id="XMLID_5_" d="M307.5,150h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S315.784,150,307.5,150z"></path> <path id="XMLID_6_" d="M172.5,90c8.284,0,15-6.716,15-15V15c0-8.284-6.716-15-15-15s-15,6.716-15,15v60 C157.5,83.284,164.216,90,172.5,90z"></path> <path id="XMLID_7_" d="M172.501,240c-8.284,0-15,6.716-15,15v60c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-60 C187.501,246.716,180.785,240,172.501,240z"></path> <path id="XMLID_8_" d="M77.04,48.327c-5.856-5.858-15.354-5.857-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l42.427,42.428 c2.929,2.929,6.768,4.394,10.606,4.394c3.838,0,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0-21.213L77.04,48.327z"></path> <path id="XMLID_9_" d="M246.746,218.034c-5.857-5.857-15.355-5.857-21.213,0c-5.858,5.858-5.857,15.355,0,21.213l42.428,42.426 c2.929,2.929,6.768,4.393,10.607,4.393c3.839,0,7.678-1.465,10.606-4.393c5.858-5.858,5.858-15.355,0-21.213L246.746,218.034z"></path> <path id="XMLID_10_" d="M98.254,218.034L55.828,260.46c-5.858,5.858-5.858,15.355,0,21.213c2.929,2.929,6.768,4.393,10.607,4.393 c3.839,0,7.678-1.464,10.606-4.393l42.426-42.426c5.858-5.858,5.858-15.355,0-21.213 C113.609,212.176,104.111,212.176,98.254,218.034z"></path> </g> </g></svg>
                                      `)}`}
                                />
                            </a>
                            <h3>
                                <a href={`blogs/${blog.documentId}`} className="text-[#00a8e8] hover:text-blue-800 transition-all">
                                    {blog.Title}
                                </a>
                            </h3>
                            <p className="ml-3">{blog.Description.substring(0, 80)}...</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReviewCarousel;
