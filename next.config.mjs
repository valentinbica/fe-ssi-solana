/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        '@ant-design',
        '@ant-design/icons',
        'rc-util',
        'rc-pagination',
        'rc-picker'
    ],
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push('pino-pretty', 'encoding');
        return config;
    },
};

export default nextConfig;
