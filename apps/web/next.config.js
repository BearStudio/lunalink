/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/lunalink",
  assetPrefix: "/lunalink/",
  transpilePackages: ["@bearstudio/lunalink"],
};

export default nextConfig;
