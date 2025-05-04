/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
  compiler: {
    emotion: true
  }
};

module.exports = nextConfig;
