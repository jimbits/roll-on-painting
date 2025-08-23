import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
              expandProps: true,
              svgProps: {
                className: '{props.className}',
              },
            },
          },
        ],
        as: '*.js', // Important: Tells Turbopack to treat output as JavaScript
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/jimbits/image/upload/**', // Allows all Cloudinary paths
      },
    ],
  },
  webpack(config) {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        // disable plugins that might cause issues
                        removeViewBox: false,
                        removeUselessStrokeAndFill: false,
                      },
                    },
                  },
                  'removeDimensions', // Remove width/height for responsive SVGs
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [
          /node_modules/,
          /archive/,
          /\.git/,
          /docs/, // Exclude docs folder
          /tests?/, // Exclude test/tests folders
          /coverage/, // Exclude coverage folder
          /\.storybook/, // Exclude Storybook folder
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
