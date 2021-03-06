import React, { useEffect, useState, useContext } from "react";
import ProductCard from '../productCard/ProductCard'
import {CartContext} from '../../context/shopContext'
import Dropdown from '../dropdown/Dropdown'
import { getProductsInCollection } from '../../adapters/shopify';
import Image from "next/image"
import empty from '../../public/images/mouse.gif'



const ProductList = ({products, title, variants, category}) => {

    const [productItems, setProductItems] = useState(products.edges)
    const { allProductItems, sizeSelected, getPaginatedProducts } = useContext(CartContext)

    useEffect(() => {
        allProductItems? setProductItems(allProductItems) : null
    }, [allProductItems])

    

    return (
        <div>
            <div className="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex flex-row justify-between items-center mb-6 z-50">

                    <h2 className="text-2xl font-extrabold text-gray-900 font-lora">
                        {title?title:"Just dropped"}
                    </h2>
                    <Dropdown variants={variants} category={category} />

                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {
                       productItems.length >= 1? productItems.map(product => (
                            <ProductCard key={product.node.id} product={product} ></ProductCard>
                        ))   
                        : 
                        <div>
                            <span className="text-base" >no products :(</span>
                             <Image src={empty} alt="empty-gif" />
                             <a   className="text-lg font-medium text-indigo-600 hover:text-indigo-500" href={`/`} passHref>explore all products &rarr;</a>
                        </div>
                        
                        
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductList;
