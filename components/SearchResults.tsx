"use client";
import "@/components/backend"
import { useEffect, useState } from "react";

const SearchResults = ({ query }: { query: string }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query) return;

        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/blogs?filters[Title][$contains]=${query}&populate=Images_cover`);
            const data = await res.json();
            setResults(data.data);
        };

        fetchData();
    }, [query]);

    return (
        <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg" style={{ background: 'var(--color-card-muted)' }}>
            {results.length > 0 ? (
                results.map((blog: Blog) => (
                    <div key={blog.id} className="p-2">
                        <a href={`blogs/${blog.documentId}`} className="text-sm text-gray-400 hover:text-blue-800 transition-all">
                            {blog.Title}
                        </a>
                    </div>
                ))
            ) : (
                <p className="p-2 text-gray-400">ไม่พบผลลัพธ์</p>
            )}
        </div>
    );
};

export default SearchResults;
