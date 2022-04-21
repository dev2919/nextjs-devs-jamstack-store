import React, { useEffect, useState, useContext } from "react";
import { getAllProductsInCollection, getProductsInCollection } from '../../adapters/shopify'
import { getCategory } from '../../adapters/sanity'
import ProductPageContent from '../../components/productPageContent/ProductPageContent'
import ProductList from '../../components/productList/ProductList'
import Pagination from '../../components/pagination/Pagination'
import { useRouter } from 'next/router'
import {CartContext} from '../../context/shopContext'

export default function CategoryPage ({ products })  {  
  const router = useRouter()

  const [category, setCategory] = useState(router.query.category)

    

  return (
    <div className="text-3xl">
    <ProductList products={products} title={category} ></ProductList>
    <Pagination products={products} category={category} > </Pagination>
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
