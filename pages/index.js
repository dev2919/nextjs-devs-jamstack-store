import { getProductsInCollection } from '../adapters/shopify'
import ProductList from '../components/productList/ProductList'
import Pagination from '../components/pagination/Pagination'
import Head from 'next/head';
import Thumbnail from '../public/images/logo.png'


function Home({ products }){
  return (
    <>
      <Head>
        <title>Thrift Bharat 🇮🇳</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="thrift • streetwear • vintage • clothing shop" />
        <meta property="og:title" content="Thrift Bharat 🇮🇳" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://i.imgur.com/xI9KNoX.jpg" />
      </Head>
      <div className="text-3xl">
        <ProductList products={products}></ProductList>
        <Pagination products={products} category={"home-page"} > </Pagination>
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const products = await getProductsInCollection("home-page")

  return {
    props: { products }, // will be passed to the page component as props
  }
}
