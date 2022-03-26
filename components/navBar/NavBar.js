import React, { useContext } from 'react'
import Image from "next/image"
import Link from 'next/link';
import logo from '../../public/images/logo.png'
import bag from '../../public/images/bag.png'
import { CartContext } from '../../context/shopContext'
import MiniCart from '../cart/MiniCart'

const NavBar = () => {

  const {cart, cartOpen, setCartOpen} = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

    return (
        <>
          <div className="max-w-7xl mx-auto px-2 w-full sm:px-6 lg:px-8 border-b sticky top-0 z-20 bg-white">
            <div className="relative flex justify-between h-16">

              <div className="flex-1 flex items-start">
                <div className="flex-shrink-0 flex items-start w-44 h-12">
                <Link href="/" passHref>
                      <Image src={logo} alt={"altText"} />
                </Link>
                </div>
              </div>

              <div className="flex-1 flex items-end justify-end m-auto">
                <div className="w-12 h-14"
                  onClick = {() => { setCartOpen(!cartOpen) }}
                >
                      <Image src={bag}  alt={"altText"} />
                      <p className="absolute w-8 h-8 flex justify-center items-center bg-red-500 font-bold text-lg text-white rounded-full top-6 right-0">{cartQuantity}</p>
                </div>
              </div>
            </div>
          </div>
          <MiniCart cart={cart} />
        </>

    )
}

export default NavBar