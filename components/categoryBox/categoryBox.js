import React, {useEffect, useState} from 'react'
import bg from '../../public/images/category.png'
import Image from "next/image"
import imageUrlBuilder from '@sanity/image-url'

const CategoryBox = ({collectionList}) => {

    const [imageUrl, setImageUrl] = useState(bg)

    const {image, slug, title} = collectionList

    useEffect(() => {
      
        const imgBuilder = imageUrlBuilder({
            projectId:'20uzw62k',
            dataset:'production',
        })

        setImageUrl(imgBuilder.image(image).url())

    }, [image])


    return (
    <a href={`/category/${slug.current}`} passHref>
        <div
            className="flex flex-col gap-2.5 justify-start items-start overflow-hidden h-full w-full lg:h-full px-4 py-[0.6rem] bg-neutral-50">
            <div className="flex flex-row justify-start items-center overflow-hidden h-full w-full pl-4 bg-white border-gray-800 border rounded-lg shadow-[0px_4px_9px_0px_rgba(0,0,0,0.1)]">
                <p className="block text-2xl text-gray-800  font-semibold font-lora w-full">{title}</p>
                <div className="relative w-4/6 flex justify-end">
                <Image className="block" src={imageUrl} width={400} height={300} />
                </div>
            </div>
        </div>
    </a>

    )
}

export default CategoryBox