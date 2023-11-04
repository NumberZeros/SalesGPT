/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    esmExternals: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.resolve.alias.https = 'https-browserify'
  //   config.resolve.alias.http = 'http-browserify'
  //   config.resolve.fallback = {
  //     querystring: require.resolve('querystring-es3'),
  //     fs: false,
  //     os: false,
  //     stream: false
  //   }

  //   return config
  // }
}
