import React from "react";
import "@/components/backend";

interface TableOfContentsProps {
    blog: Blog;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ blog }) => {
    return (
        <div key="TableOfContents">
            {/* Title */}
            <p className="mt-2 text-lg" style={{ color: 'var(--color-text-border)' }}>
                สารบัญ
            </p>

            {/* Table of Contents List */}
            <ul className="toc-list flex flex-col gap-2 mt-2">
                {blog.MainContent.map((block, index) => {
                    if (block.type === "heading" && block?.level != null) {
                        const H = Number(block?.level);
                        const headingText = block?.children[0]?.text || `heading-${index}`;

                        return (
                            <li key={index} className={`toc-item toc-h${H}`}>
                                <a href={`#${headingText}`} className="toc-link">
                                    {headingText}
                                </a>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
        </div>

    )
}

export default TableOfContents;