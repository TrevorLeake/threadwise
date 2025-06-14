// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
// });
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
  },
});

// module.exports = withMDX({
// });


// console.log('Disable toast?', process.env.NEXT_PUBLIISR_BUILD_TOAST);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // pageExtensions: ['ts', 'tsx', 'mdx'],
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  trailingSlash: true,

  //  'https://dev-audio-bucket-912038100408-us-west-2.s3.us-west-2.amazonaws.com/images/piano/piano2_0.png'
  // const imgURL = 'https://dev-audio-renders.s3.us-west-2.amazonaws.com/piano/piano2_0.png'
  devIndicators:false,
  output:'export',

  images: {
    unoptimized:true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev-audio-renders.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

  // If you're using custom SWC plugins (like transforms), you can use:
  // experimental: {
  //   swcPlugins: [
  //     [require.resolve("my-swc-transform-plugin"), {}]
  //   ]
  // },
};

module.exports = withMDX(nextConfig);
