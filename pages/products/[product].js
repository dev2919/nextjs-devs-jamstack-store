import React from 'react'
import { getAllProductsInCollection, getProduct } from '../../adapters/shopify'
import ProductPageContent from '../../components/productPageContent/ProductPageContent'
 
export default function ProductPage ({ product })  {

  return (
    <div className="min-h-screen py-4 sm:pt-20">
      <ProductPageContent product={product} />
    </div>
  )
}

export async function getStaticPaths(){
  const products = await getAllProductsInCollection()

   let paths = products[0].map(item => {
    const product = String(item.node.handle)
    
    return {
      params: { product }
    }
   })

  return {
    paths,
    fallback: "blocking"
  }
}

 export async function getStaticProps({ params }) {
   const product = await getProduct(params.product)

   if(product){
     return {
       props:{
         product
       },
       revalidate: 10
     }

   }


 }