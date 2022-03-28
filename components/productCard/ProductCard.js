import React from "react";
import Image from "next/image";
import Link from "next/link";
import rupeeFormatter from 'rupee-formatter'

const ProductCard = ({product}) => {
    const {handle, title} = product.node

    const {altText, url} = product.node.images.edges[0].node
    const {amount} = product.node.priceRange.minVariantPrice
    const {value} = product.node.variants.edges[0].node.selectedOptions[0]


    return (
        <Link href={`/products/${handle}`}>
            <a className="group">
                <div className=" demo h-44 overflow-hidden shadow-[3px_0px_19px_rgba(0,0,0,0.04)]">
                    <div className="relative group-hover:opacity-75 w-full h-full">
                        <Image src={url} alt={altText} layout='fill' objectFit="cover"/>
                    </div>
                </div>
                <h3 className="mt-2 text-sm font-semibold truncate text-gray-900">{ title }</h3>
                <h3 className=" mt-0.5 text-sm font-bold  text-gray-500">{ value }</h3>
                <h4 className="text-base  font-semibold  text-gray-900">{ rupeeFormatter(amount) }</h4>
            </a>
        </Link>
    );
};

export default ProductCard;
