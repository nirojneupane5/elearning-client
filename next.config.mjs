/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol: 'http',
            hostname: 'localhost',
        },{
            protocol:"https",
            hostname:"elearning-server-6.onrender.com"

        },
    ]
    }
};

export default nextConfig;
