/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://saveagain.dev",
    generateRobotsTxt: true, // สร้าง robots.txt ด้วย
    sitemapSize: 5000, // จำนวน URL ต่อไฟล์ sitemap
  };
  