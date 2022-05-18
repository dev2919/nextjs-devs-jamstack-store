import React, { useEffect, useState, useContext } from "react";
import ProductCard from '../productCard/ProductCard'
import {CartContext} from '../../context/shopContext'
import Dropdown from '../dropdown/Dropdown'
import { getProductsInCollection } from '../../adapters/shopify';


const ProductList = ({products, title, variants, category, size}) => {

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
                    <Dropdown variants={variants} category={category} size={size} />

                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {
                        productItems.map(product => (
                            <ProductCard key={product.node.id} product={product} ></ProductCard>
                        ))  
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductList;
