import Reac, {useEffect, useState} from 'react'
import bg from '../../public/images/collectionBox.png'
import Image from "next/image"
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'

const CollectionBox = ({collectionList}) => {

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
            <div className="flex flex-col justify-start items-start overflow-hidden h-full mx-auto px-2 py-[1.06rem] bg-neutral-50">
                <div className="relative w-full h-full "> 
                    <img className="block h-full " src={imageUrl}  width={400} height={400}  />
                </div>
                <div className="flex flex-col justify-start items-start w-full">
                    <div
                        className="flex flex-row gap-2.5 justify-center items-center overflow-hidden w-full px-2 py-1 bg-gray-800">
                        <p className="block text-white font-semibold font-lora text-lg">{title}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default CollectionBox