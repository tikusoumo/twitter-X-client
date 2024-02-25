/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
        },
        {
            protocol: 'https',
            hostname: 'twitter-soumojit.s3.ap-south-1.amazonaws.com',
            port: '',
        }
    ],
    }
}

module.exports = nextConfig

//avatars.githubusercontent.com/u/tikusoumo