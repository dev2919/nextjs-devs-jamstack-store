import { getProductsInCollection } from '../adapters/shopify'
import ProductList from '../components/productList/ProductList'
import Pagination from '../components/pagination/Pagination'
import Head from 'next/head';


function Home({ products }){
  return (
    <>
      <Head>
        <title>Thrift Bharat 🇮🇳</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <div className="text-3xl">
      <ProductList products={products}></ProductList>
      <Pagination products={products} > </Pagination>
    </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}
