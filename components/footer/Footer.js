import React from 'react'
import Image from "next/image"
import original from '../../public/images/original.gif'
import om from '../../public/images/TUT.png'

const Footer = () => {
    return (
        <div
            className="flex flex-col gap-0 justify-center items-center w-full max-w-6xl mx-auto">
            {/* <div className="w-4 h-full">
            <Image src={om} alt="footer-om" />
        </div> */}
            <footer
                className="py-4 rounded-lg justify-center align-middle mx-auto md:flex md:items-end md:justify-between md:py-6 w-full">
                <div className='flex sm:justify-center items-center md:block flex-col w-auto' >

                    <div className="w-32 h-48 overflow-hidden ">
                        <Image src={original} alt="footer-gif"/>
                    </div>
                    <span className="text-sm text-gray-500 sm:text-center sm:mx-auto">
                    © 2022{" "}
                        <a href="https://flowbite.com" className="hover:underline">
                            Thrift Bharat
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
                <ul
                    className="flex flex-wrap justify-center items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="/info/about" className="mr-4 hover:underline md:mr-6 ">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="/info/privacy-shipping" className="mr-4 hover:underline md:mr-6">
                            Privacy & Shipping policy
                        </a>
                    </li>
                    <li>
                        <a href="/info/tnc" className="mr-4 hover:underline md:mr-6">
                            Terms & Conditions
                        </a>
                    </li>
                    <li>
                        <a href="/info/refund-returns" className="hover:underline mr-4  md:mr-6">
                            Refunds & Cancellations
                        </a>
                    </li>
                    <li>
                        <a href="/info/contact" className="hover:underline">
                            Contact
                        </a>
                    </li>
                </ul>
            </footer>

        </div>
    )
}

export default Footer