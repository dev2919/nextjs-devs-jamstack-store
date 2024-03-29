import { useState, useContext, useEffect } from "react"
import {CartContext} from '../../context/shopContext'
import rupeeFormatter from 'rupee-formatter'
import Accordion from "../accordion/Accordion"
import Image from 'next/image'
import url from '../../public/images/heart.gif'
import Head from 'next/head';



const ProductForm = ({ product }) => {

  const { addToCart, cart, setCartOpen, allProductItems } = useContext(CartContext)
  const [inCart, setInCart] = useState(false)
  const [displayHeart, setDisplayHeart] = useState(true)

  //check if product is cart on render
  useEffect(() => {
    
    for (let index = 0; index < cart.length; index++) {
      if(cart[index].splId===product.id){
        setInCart(true)
        setDisplayHeart(true)
        break
      } else {
        setDisplayHeart(false)
        setInCart(false)
      }
    }

    return
  }, [])

    //check if product is cart on cart object change
  useEffect(() => {
    cart.length? null : setInCart(false) 

    for (let index = 0; index < cart.length; index++) {
      if(cart[index].splId===product.id){
        setInCart(true)
        break
      } else {
        setInCart(false)
      }
    }
    
    return
  }, [cart])

  const allVariantOptions = product.variants.edges?.map(variant => {
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
      splId: product.id
    }
  })
  
  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })
  

  const addCart = () => {
    addToCart(selectedVariant) 

    setDisplayHeart(false)
    setTimeout(() => {
      setDisplayHeart(true)
    }, 1000);
  }

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])


  return (
    <div className="rounded-2xl p-4 flex flex-col w-full md:w-1/3">
      <Head>
      <meta property="og:title" content={product.title} />
      <meta property="og:type" content="article" />
        <meta name="description" content={product.descriptionHtml} />

      </Head>
      <h2 className="text-2xl font-bold font-lora">{product.title}</h2>
      <span className="pb-6 mt-2 text-lg font-semibold text-gray-800">{rupeeFormatter(selectedVariant.variantPrice)}</span>

      {inCart
        ?
        <>
          <div className="w-32 h-32 absolute top-[66%] left-[50%] translate-x-[-50%] transalte-y-[-50%] ">
            <Image src={url} alt={"yello"} layout='fill' objectFit="cover" className={displayHeart?"invisible":"visible"}/>
          </div>
          <button
          onClick={() => setCartOpen(true) }
          className={`bg-black rounded-full text-white px-2 py-3 hover:bg-gray-300 font-lora `}> 
          in your cart
          </button>
        </>
        : 
          <button onClick={addCart} className={`bg-black rounded-full text-white px-2 py-3 hover:bg-gray-300 font-lora `}> 
            add to cart
          </button>
      }

      <div className="flex flex-col gap-4 py-8">
        <Accordion title="Details" content={product.descriptionHtml} open={true}/>
        <Accordion title="Shipping and Returns" content={"<p>1. We will refund you the whole amount if there are any unmentioned defects.<br>2. We will refund you the whole amount if the size of the product is mentioned wrong in its description.<br>3. We will refund you the whole amount if you don't like the product (the customer must bear the shipping charges ).<br>4. You must make claims on the same day of delivery.</p>"}/>
      </div>
    </div>
  )
}

export default ProductForm