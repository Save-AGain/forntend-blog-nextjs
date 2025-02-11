import "@/components/backend";

const fetchTag = async () => {
    try {
        const response = await fetch(`${process.env.STRAPI_BASE_URL}/api/tags/`);
        const data = await response.json();
        return data.data as Tag[];
    } catch (error) {
        console.log('error', error)
        return null
    }
}

export default async function Page() {
    const tags = await fetchTag();
    return (
        <>
            <div className="flex flex-col items-start justify-start divide-y md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
                <div className="space-x-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl leading-9 tracking-tight text-gray-300 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
                        Tags
                    </h1>
                </div>
                <div className="flex max-w-lg flex-wrap">
                    {tags?.map((tag) => (
                        <a key={tag.documentId} href={`tags/${tag.documentId}`}
                            className="tag px-3 py-2 mx-1 rounded-full bg-[#1a1a2e] text-sm font-medium transition-all hover:bg-[#0d1a2b] hover:scale-105 shadow-md bg-opacity-30"
                            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                        >
                            {tag.Tag}
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}