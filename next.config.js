// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    // images: {unoptimized: true}
    images: {                   // allowing stripe domain for getting images
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'files.stripe.com',
            }
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig


// normally npm run build creates server side build folder in .next but if we want a static export build folder
// create next.config.js with default config and run build again, it will create an out build folder 
// we can deploy this folder for production
// if want to check in local, use this command as defined in package.json "serve out"
// Note: Image Next comp is not supported with this config, why?
// because it works on server side to provide optimized images on UI based on viewport and network and
// that's why node server is required,
// while in case of SSG, where images are delivered at build time  
// those images would already be there built statically at build time

// if we still want to use output: export along with Next Image, then add one more config unoptimized : true
// to say that we dont need optimized images then next js will ignore this


// to do "npm run lint", we need .eslintrc.json file, without this it wont run