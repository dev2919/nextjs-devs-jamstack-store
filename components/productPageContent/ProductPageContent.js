import React, { useState } from 'react'
import Image from 'next/image'
import ProductForm from '../productForm/ProductForm';

export default function ProductPageContent({product}) {

    const images = []


    product.images.edges.map((image, i) => {
        images.push(
            <div className=" demo h-64 w-64 relative mr-4 bg-gray-200">
                <Image src={image.node.url} alt={image.node.altText} layout="fill" objectFit="cover"/>
            </div>
        )
    })

    return (
        <div>
            <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-z-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
                <div className="w-full max-w-md border md:w-1/2 overflow-scroll">
                    <div className="relative h-fit flex flex-row w-max ">
                        {
                            images.map(item => {
                               return item
                            })
                        }
                    </div>
                </div>
                <ProductForm product={product}></ProductForm>
            </div>
        </div>
    )
}
