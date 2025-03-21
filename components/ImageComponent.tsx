'use client'
import React, { useState } from "react";
import Image from 'next/image';
import "@/components/backend";

type ImageComponentProps = {
  block: Image;
};

const ImageComponent: React.FC<ImageComponentProps> = ({ block }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {/* รูปภาพปกติ */}
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${block?.formats?.large?.url || block?.formats?.medium?.url || block?.formats?.small?.url || block?.formats?.thumbnail?.url}`}
        alt={block?.alternativeText || ""}
        layout="responsive"
        width={block?.formats?.large?.width || block?.formats?.medium?.width || block?.formats?.small?.width || block?.formats?.thumbnail?.width}
        height={block?.formats?.large?.height || block?.formats?.medium?.height || block?.formats?.small?.height || block?.formats?.thumbnail?.height}
        className="transform transition duration-300 hover:scale-105 rounded-lg "
        priority={false} // เปิด Lazy Load
        style={{ maxWidth: "100%", cursor: "pointer" }}
        onClick={handleImageClick}
      />

      {/* Overlay และรูปภาพขยาย */}
      {isExpanded && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleImageClick}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${block?.formats?.large?.url || block?.formats?.medium?.url || block?.formats?.small?.url || block?.formats?.thumbnail?.url}`}
            alt={block?.alternativeText || ""}
            width={block?.formats?.large?.width || block?.formats?.medium?.width || block?.formats?.small?.width || block?.formats?.thumbnail?.width}
            height={block?.formats?.large?.height || block?.formats?.medium?.height || block?.formats?.small?.height || block?.formats?.thumbnail?.height}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
            priority={false}
          />
        </div>
      )}
    </div>
  );
};

export default ImageComponent;