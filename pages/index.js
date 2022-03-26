import Head from 'next/head'
import Image from 'next/image'
import { getProductsInCollection } from '../adapters/shopify'
import ProductList from '../components/productList/ProductList'
import Pagination from '../components/pagination/Pagination'

function Home({ products }){
  return (
    <div className="text-3xl">
      <ProductList products={products}></ProductList>
      <Pagination products={products} > </Pagination>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const products = await getProductsInCollection()

  return {
    props: { products }, // will be passed to the page component as props
  }
}
