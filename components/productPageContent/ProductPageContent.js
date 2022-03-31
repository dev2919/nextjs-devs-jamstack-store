import { useContext } from "react"
import Image from 'next/image'
import ProductForm from '../productForm/ProductForm';
import { useRouter } from 'next/router'
import {CartContext} from '../../context/shopContext'

export default function ProductPageContent({product}) {
    const router = useRouter()
    const images = []

  const {globalItemCursor} = useContext(CartContext)
    

    product.images.edges.map((image, i) => {
        images.push(
            <div className=" demo h-64 w-64 relative mr-4 bg-gray-200">
                <Image src={image.node.url} alt={image.node.altText} layout="fill" objectFit="cover"/>
            </div>
        )
    })



    const goBack = () =>{
        if(globalItemCursor){
            router.back() 
        } else {
            router.push(`/`, undefined, { shallow: false })
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-start space-y-4 md:flex-row md:items-start md:space-y-0 md:space-z-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
            <a aria-hidden="true" className="text-base font-semibold font-lora cursor-pointer"
             onClick={() => { goBack() }}> &larr; <span className="underline">back to store </span></a>
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
