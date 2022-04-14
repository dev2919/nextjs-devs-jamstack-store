/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env:{
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN
  },
  images:{
    domains: ['cdn.shopify.com','cdn.sanity.io']
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
}
