import React, { useEffect, useState, useContext } from "react";
import ProductCard from '../productCard/ProductCard'
import { getProductsAfterPagination } from '../../adapters/shopify';
import { getProductsBeforePagination } from '../../adapters/shopify';
import {CartContext} from '../../context/shopContext'


// import Pagination from '../pagination/Pagination'

const ProductList = ({products}) => {

    const [productItems, setProductItems] = useState(products.edges)
    // const [itemCursor, setItemCursor] = useState( products[products.length - 1] )
    // const [itemPrevCursor, setItemPrevCursor] = useState( products[0] )
    const { getProducts, allProductItems } = useContext(CartContext)


    useEffect(() => {
        allProductItems? setProductItems(allProductItems) : null
    }, [allProductItems])
    

    return (
        <div >
            <div
                className="max-w-2xl mx-auto py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">

                <h2 className="text-2xl font-extrabold text-gray-900 mb-6 font-lora">
                Shop All
                </h2>

                <div
                    className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                    {
                        productItems.map(product => (
                            <ProductCard key={product.node.id} product={product}></ProductCard>
                        ))  
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductList;
