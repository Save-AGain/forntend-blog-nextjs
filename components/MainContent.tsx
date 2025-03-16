import React from "react";
import ImageComponent from "@/components/ImageComponent";
import "@/components/backend";

interface ContentsProps {
  blog: Blog;
}

const MainContents: React.FC<ContentsProps> = ({ blog }) => {
  return (
    <div key={`blog-${blog?.documentId}`}>
      {blog.MainContent.map((block, index) => {
        switch (block?.type) {
          case "heading": {
            if (!block?.level) return null;
            let h = `h${Number(block?.level) + 1}`;
            if (Number(block?.level) == 6){h = 'h6'}
            const H = h;
            const headingText = block?.children[0]?.text || `heading-${index}`;

            return (
              <div id={headingText} key={headingText}>
                {React.createElement(H, {}, block?.children[0]?.text)}
              </div>
            );
          }

          case "paragraph":
            return (
              <div key={`paragraph-${index}`}>
                {block.children.map((child, i) => {
                  if (child?.type !== "text") {
                    if (child?.children[0]?.text == "videovideo") {
                      return (
                        <div key={`linkvideo-${i}`} className="video-container">
                          <iframe
                            width="100%"
                            height="315"
                            src={`${child?.url}`}
                            title="YouTube Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )
                    } else
                      return (
                        <a key={`link-${i}`} href={child?.url} target="_blank" rel="noopener noreferrer" className="link">
                          {child?.children[0]?.text || "Click here"}
                        </a>
                      );
                  }

                  // ถ้าข้อความว่างให้แสดง <br />
                  if (child?.text === "") return <br key={`br-${i}`} />;

                  // แบ่งข้อความตาม \n และเก็บไว้ใน lines
                  const lines = child?.text.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={`line-${lineIndex}`}>
                      {line}
                      {lineIndex !== child?.text.split('\n').length - 1 && <br />} {/* เพิ่ม <br /> เว้นบรรทัด */}
                    </React.Fragment>
                  ));

                  let content = <span key={`text-${i}`}>{lines}</span>;

                  if (child?.code) {
                    content = (
                      <pre key={`code-${i}`}>
                        <code>{child?.text}</code>
                      </pre>
                    );
                  } else {
                    if (child?.bold) content = <strong key={`bold-${i}`}>{content}</strong>;
                    if (child?.italic) content = <i key={`italic-${i}`}>{content}</i>;
                    if (child?.underline) content = <u key={`underline-${i}`}>{content}</u>;
                    if (child?.strikethrough) content = <del key={`strikethrough-${i}`}>{content}</del>;
                  }
                  return content;
                })}
              </div>
            );

          case "image":
            return (
              <div key={`image-${index}`}>
                <ImageComponent block={block?.image} />
                <p className="prose max-w-none text-gray-500 text-sm mt-3" style={{ textAlign: 'center' }}>
                  {block?.image?.caption}
                </p>
              </div>
            );

          case "list":
            const ListTag = block?.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={`list-${index}`}>
                {block.children.map((child, i) => (
                  <li key={`list-item-${index}-${i}`}>{child?.children[0]?.text}</li>
                ))}
              </ListTag>
            );

          case "quote":
            return (
              <blockquote key={`quote-${index}`} style={{ fontStyle: "italic", borderLeft: "4px solid #ccc", paddingLeft: "10px" }}>
                {block?.children.map((child, i) => (
                  <p key={`quote-text-${index}-${i}`}>{child?.text}</p>
                ))}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );


}

export default MainContents;