'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Image from 'next/image';
import "@/components/backend";

const PAGE_SIZE = 5; // จำนวนโพสต์ต่อหน้า

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1; // ค่า default คือ 1
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [tagId, setTagId] = useState<string | null>(null);
    const [tagName, setTagName] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setTagId((await params).id)
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/blogs?filters[tags][documentId][$eq]=${tagId}&pagination[page]=${currentPage}&pagination[pageSize]=${PAGE_SIZE}&populate=Images_cover&populate=tags`
            );
            const data = await res.json();
            setBlogs(data.data);
            setTotalPages(data.meta.pagination.pageCount);

            if (tagId) {
                const matchedTag = data.data[0].tags?.find((tag: { documentId: string; }) => tag.documentId === tagId);
                setTagName(matchedTag?.Tag || null); // เก็บเฉพาะ string หรือ null
            }
        };

        fetchData();
    }, [currentPage, tagId, params]);

    const handlePageChange = (newPage: number) => {
        router.push(`/tags/${tagId}?page=${newPage}`);
    };

    return (
        <Suspense fallback={<div><h1 className="text-4xl font-bold text-blue-600">Loading...</h1></div>}>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Tag{' : '}
                        {tagName && (
                            <span style={{ color: 'var(--color-accent)' }}>
                                {tagName}
                            </span>
                        )}
                    </h1>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {blogs?.map((blog, index) => (
                        <li key={index} className="py-12">
                            <article>
                                <div className=" space-y-2 md:grid md:grid-cols-4 md:space-y-4 ">
                                    <dl>
                                        <dd className="flex-grow aspect-[16/9] rounded-lg w-full max-w-[256] h-full ">
                                            <a href={`/blogs/${blog.documentId}`}>
                                                <Image
                                                    className="w-full max-w-[256] h-full  object-cover transform transition duration-300 hover:scale-105 hover:rotate-2 rounded-lg"
                                                    src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${blog.Images_cover?.url}`}
                                                    alt="Cover"
                                                    layout="responsive"
                                                    width={400}
                                                    height={400}
                                                    priority={false} // เปิด Lazy Load
                                                />
                                            </a>
                                            <br />
                                        </dd>
                                    </dl>
                                    <div className="space-y-5 col-span-3 ml-0 sm:ml-5 md:ml-10">
                                        <div className="space-y-6">
                                            <div>
                                                <time dateTime={blog.createdAt} className="prose max-w-none text-gray-400 text-sm">
                                                    {new Date(blog.createdAt).toLocaleDateString("th-TH", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </time>
                                                <h2 className="text-2xl font-bold leading-8 tracking-tight mb-1">
                                                    <a href={`/blogs/${blog.documentId}`} className="text-gray-300 hover:text-blue-800 transition-all">
                                                        {blog.Title}
                                                    </a>
                                                </h2>
                                                <div className="flex flex-wrap gap-3">
                                                    {blog.tags?.map((tag) => (
                                                        <a key={tag.documentId} href={`/tags/${tag.documentId}`}
                                                            className="tag px-3 py-2 mx-1 rounded-full bg-[#1a1a2e] text-white text-sm font-medium transition-all hover:bg-[#0d1a2b] hover:scale-105 shadow-md bg-opacity-30"
                                                            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                                                        >
                                                            {tag.Tag}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="prose max-w-none text-gray-400">{blog.Description}</div>
                                        </div>
                                        <div className="text-base font-medium leading-6">
                                            <a
                                                href={`/blogs/${blog.documentId}`}
                                                className="text-gray-300 hover:text-blue-800 transition-all"
                                                aria-label={`Read more: "${blog.Title}"`}
                                            >
                                                Read more &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center items-center gap-4 mt-5" style={{ borderTopWidth: "0px" }}>
                    {/* ซ่อนปุ่ม "ก่อนหน้า" เมื่ออยู่หน้าแรก */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="hover:text-blue-800 transition-all"
                        >
                            ◀ ก่อนหน้า
                        </button>
                    )}

                    <select
                        value={currentPage}
                        onChange={(e) => handlePageChange(Number(e.target.value))}
                        className="rounded px-2 py-1"
                        style={{ background: "var(--color-card)" }}
                    >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <option key={page} value={page}>
                                หน้า {page}
                            </option>
                        ))}
                    </select>

                    {/* ซ่อนปุ่ม "ถัดไป" เมื่ออยู่หน้าสุดท้าย */}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="hover:text-blue-800 transition-all"
                        >
                            ถัดไป ▶
                        </button>
                    )}
                </div>
            </div>
        </Suspense>
    );
}


