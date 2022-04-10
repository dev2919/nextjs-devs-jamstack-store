import React from 'react'
import { getAllProductsInCollection, getProductsInCollection } from '../../adapters/shopify'
import ProductPageContent from '../../components/productPageContent/ProductPageContent'
import ProductList from '../../components/productList/ProductList'
import Pagination from '../../components/pagination/Pagination'
import { useRouter } from 'next/router'

export default function CategoryPage ({ products })  {

  const router = useRouter()

  console.log(router.query);

  return (
    <div className="text-3xl">
    <ProductList products={products}></ProductList>
    <Pagination products={products} category={"under-999"} > </Pagination>
  </div>
  )
}

export async function getStaticPaths(){
  const category = await getAllProductsInCollection()

   let paths = category[1].map(item => {
    const category = String(item.node.handle)
    
    return {
      params: { category }
    }
   })

  return {
    paths,
    fallback: false
  }
}

 export async function getStaticProps({ params }) {

  const products = await getProductsInCollection(params.category)

   return {
     props:{
      products
     }
   }

 }