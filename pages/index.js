import { getProductsInCollection, getAllProductsInCollection } from '../adapters/shopify'
import { getCollection } from '../adapters/sanity'
import ProductList from '../components/productList/ProductList'
import Pagination from '../components/pagination/Pagination'
import Head from 'next/head';
import Thumbnail from '../public/images/logo.png'
import CategoryBox from '../components/categoryBox/categoryBox'
import CollectionBox from '../components/collectionBox/collectionBox'

function Home({ products, collectionList, variants }){

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
        <div className="max-w-2xl lg:max-w-7xl m-auto flex flex-col lg:flex-row">
          <div className="category-container flex flex-col w-full lg:w-4/5">
            <CategoryBox collectionList={collectionList[0]} />
            <CategoryBox collectionList={collectionList[2]} />
          </div>

          <div className="flex w-fit lg:flex-col lg:w-1/5 ">
            <CollectionBox collectionList={collectionList[1]} />
            <CollectionBox collectionList={collectionList[3]} />
          </div>
        </div>
        <ProductList products={products} variants={variants} ></ProductList>
        <Pagination products={products} category={"home-page"} > </Pagination>
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {

  const products = await getProductsInCollection("home-page")
  const variants = await getAllProductsInCollection()

  const collectionList  = await getCollection();   

  return {
    props: { products, collectionList, variants }, // will be passed to the page component as props
  }
}
