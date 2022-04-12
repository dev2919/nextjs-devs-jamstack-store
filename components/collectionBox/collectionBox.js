import React from 'react'
import bg from '../../public/images/collectionBox.png'
import Image from "next/image"
import Link from 'next/link'

const CollectionBox = () => {
    return (
        <Link href="/category/under-999" passHref>
            <div class="flex flex-col justify-start items-start overflow-hidden mx-auto px-4 py-[1.06rem] bg-neutral-50">
                <Image class="block" src={bg}/>
                <div class="flex flex-col justify-start items-start w-full">
                    <div
                        class="flex flex-row gap-2.5 justify-center items-center overflow-hidden w-full px-6 py-1 bg-gray-800">
                        <p class="block text-white font-semibold font-lora text-lg">Under 999</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CollectionBox