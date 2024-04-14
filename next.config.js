/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    largePageDataBytes: 200 * 100000,
  },
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
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
