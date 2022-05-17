import React from 'react'
import Image from "next/image"
import original from '../../public/images/original.gif'
import om from '../../public/images/TUT.png'

const Footer = () => {
    return (
        <div className="flex flex-col gap-0 justify-center items-center max-w-[7.13rem] mx-auto">
           <div className="w-32 h-48 overflow-hidden ">
            <Image src={original} alt="footer-gif" />
           </div>
            {/* <div className="w-4 h-full">
            <Image src={om} alt="footer-om" />
           </div> */}
        </div>
    )
}

export default Footer