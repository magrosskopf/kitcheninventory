/** @type {import('next').NextConfig} */
const nextConfig = {
    
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse'],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    domains: ['picsum.photos'],
},
};

export default nextConfig;
