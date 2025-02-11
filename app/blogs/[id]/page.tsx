'use client'
import { useState, useEffect } from "react";
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';
import Image from 'next/image';
import React from "react";
import Link from 'next/link';
import TableOfContents from "@/components/TableOfContents";
import MainContents from "@/components/MainContent";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import BackButton from "@/components/backbutton";
import ScrollProgressBar from "@/components/ScrollProgressBar";

// ฟังก์ชัน fetch ข้อมูลบล็อก
const fetchBlog = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/blogs/${id}?populate=*`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log('Error fetching blog:', error);
        return null;
    }
};


export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const [blog, setBlogs] = useState<Blog>();  // ใช้ useState เพื่อเก็บข้อมูลบล็อก
    const [loading, setLoading] = useState(true);  // ใช้ state เพื่อตรวจสอบการโหลดข้อมูล

    useEffect(() => {
        const getBlog = async () => {
            const blogId = (await params).id;
            const fetchedBlog = await fetchBlog(blogId);
            setBlogs(fetchedBlog);  // เก็บข้อมูลบล็อก
            setLoading(false);  // ปิดสถานะการโหลด
        };
        getBlog();
    }, [params]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600">Loading...</h1>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-400">404</h1>
                    <p className="mt-4 text-lg text-gray-300">Blog not found</p>
                    <p className="mt-2 text-gray-400">The blog you are looking for does not exist.</p>
                    <Link href="/" className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        Go back to homepage
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <NextSeo
                title={`${blog?.Title} | My Blog`}
                description={blog?.Description.substring(0, 150)}
                canonical={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/blogs/${blog?.documentId}`}
                openGraph={{
                    title: blog?.Title,
                    description: blog?.Description.substring(0, 150),
                    url: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/blogs/${blog?.documentId}`,
                    type: "article",
                    images: [{ url: blog?.Images_cover.url, alt: blog?.Title }],
                }}
                twitter={{
                    cardType: "summary_large_image",
                    handle: blog?.Title,
                    description: blog?.Description,
                    image: blog?.Images_cover.url,
                }}
            />

            <ArticleJsonLd
                type="BlogPosting"
                url={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/blogs/${blog.documentId}`}
                title={blog?.Title}
                images={[blog?.Images_cover.url]}
                datePublished={blog?.createdAt}
                dateModified={blog?.updatedAt}
                authorName="Save AGain"
                publisherLogo={`${process.env.NEXT_PUBLIC_SITE_URL}/ICON.png`}
                description={blog?.Description.substring(0, 150)}
            />

            <div className="grid grid-cols-5 gap-6">
                <ScrollProgressBar />
                <section className="col-span-full md:col-span-3 flex flex-col gap-6">
                    {/* Cover Image */}
                    <div className="relative w-full">
                        <Image
                            className="blog-image w-full object-cover rounded-lg shadow-lg"
                            width={600}
                            height={400}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${blog?.Images_cover?.url}`}
                            alt="Cover"
                            priority={false} // ✅ เปิด Lazy Load
                        />
                    </div>

                    {/* Main Content */}
                    <section className="relative z-20 flex flex-col gap-6">
                        {/* Left Border Highlight */}
                        <div className="flex flex-row gap-4 items-center">
                            <span className="inline-block w-2 h-full rounded bg-gradient-to-b from-rhodonite-300 to-amethyst-300" />
                        </div>

                        {/* Date & Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
                            <time dateTime={blog?.createdAt} className="mr-2 flex items-center">
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {new Date(blog?.createdAt).toLocaleDateString("th-TH", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </time>
                        </div>

                        {/* Blog Title */}
                        <h1 className="text-2xl font-bold border-b-2 pb-2 border-gray-400">
                            {blog?.Title}
                        </h1>

                        {/* Blog Tags */}
                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {blog?.tags?.map((tag) => (
                                <Link
                                    href={`/tags/${tag.documentId}`}
                                    key={tag.documentId}
                                    className="px-3 py-1 rounded-full text-sm font-medium transition-all
                                    bg-[#1a1a2e] bg-opacity-50 text-white
                                    hover:bg-[#0d1a2b] hover:scale-105 shadow-md"
                                    style={{ color: "var(--color-accent)", textDecoration: "none" }}
                                >
                                    {tag.Tag}
                                </Link>
                            ))}
                        </div>

                        {/* Table of Contents (Mobile Only) */}
                        <div key={"Table Of Contents m"} className="bg-gray-900 bg-opacity-30 rounded-lg p-4 md:hidden">
                            <TableOfContents blog={blog} />
                        </div>

                        {/* Main Content */}
                        <MainContents blog={blog} />
                    </section>
                </section>
                <section className='col-span-full md:col-span-2 flex flex-col gap-4'>
                    <div key={"Table Of Contents pc"} className='bg-gray-800 bg-opacity-30 rounded-lg hidden md:block'>
                        <TableOfContents blog={blog} />
                    </div>
                </section>
                <ScrollToTopButton />
                <BackButton />
            </div>
        </>
    );
}