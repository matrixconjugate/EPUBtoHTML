/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    maxPayloadSize: 25 * 1024 * 1024, // 25MB, adjust the size as needed
  },
};

export default nextConfig;
