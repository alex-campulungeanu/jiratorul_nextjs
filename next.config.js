/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   removeConsole: {
  //     exclude: ['error'],
  //   }
  // }
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 800,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
}

module.exports = nextConfig
