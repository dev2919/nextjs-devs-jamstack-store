import React, { useEffect, useState, useContext } from "react";
import { getAllSearchProducts, getAllProductsInCollection } from '../../adapters/shopify'
import ProductList from '../../components/productList/ProductList'
import SearchBar from '../../components/searchBar/SearchBar'
import { useRouter } from 'next/router'
import Image from "next/image"
import empty from '../../public/images/mouse.gif'


export default function Search ()  {  
    const router = useRouter()
    
    useEffect( async () => {

        if(router.query.search){            
            const products = await getAllSearchProducts(router.query.search)
            setproducts(products)
            setIsloaded(true)
        }

  },[])


  const [category, setCategory] = useState(router.query.search)
  const [products, setproducts] = useState([])
  const [isloaded, setIsloaded] = useState(false)

  return (
    <div className="text-3xl ">
        <SearchBar />
        {isloaded? <ProductList products={products} title={router.query.search} category={false}></ProductList> 
        
        : 
        <div>
        <span className="text-base w-40 h-40" > Loading :) </span>
         <Image src={empty} alt="empty-gif" />
         <a   className="text-lg font-medium text-indigo-600 hover:text-indigo-500" href={`/`} passHref>explore all products &rarr;</a>
        </div>
        }
    
    {/* <Pagination products={products} category={category} > </Pagination> */}
  </div>
  )
}

