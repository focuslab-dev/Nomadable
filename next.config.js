/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // images: {
  //   domains: ["tripnote.sgp1.cdn.digitaloceanspaces.com"],
  // },
  // headers: () => [
  //   {
  //     source: "/speed-test-download/map.jpg",
  //     headers: [
  //       {
  //         key: "Cache-Control",
  //         value: "no-store",
  //       },
  //     ],
  //   },
  // ],
};

module.exports = nextConfig;
