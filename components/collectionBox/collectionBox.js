import Reac, {useEffect, useState} from 'react'
import bg from '../../public/images/collectionBox.png'
import Image from "next/image"
import Link from 'next/link'
import imageUrlBuilder from '@sanity/image-url'

const CollectionBox = ({collectionList}) => {

    const [imageUrl, setImageUrl] = useState(bg)

    const {image, slug, title} = collectionList

    // console.log(title);

    useEffect(() => {
      
        const imgBuilder = imageUrlBuilder({
            projectId:'20uzw62k',
            dataset:'production',
        })

        setImageUrl(imgBuilder.image(image).url())

    }, [image])
    

    return (
        <Link href={`/category/${slug.current}`} passHref>
            <div class="flex flex-col justify-start items-start overflow-hidden mx-auto px-4 py-[1.06rem] bg-neutral-50">
                <div className="relative w-full h-full"> 
                    <img class="block" src={imageUrl}  width={400} height={400}  />
                </div>
                <div class="flex flex-col justify-start items-start w-full">
                    <div
                        class="flex flex-row gap-2.5 justify-center items-center overflow-hidden w-full px-6 py-1 bg-gray-800">
                        <p class="block text-white font-semibold font-lora text-lg">{title}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CollectionBox