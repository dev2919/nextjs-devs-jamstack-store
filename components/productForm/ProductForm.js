import { useState, useContext, useEffect } from "react"
import {CartContext} from '../../context/shopContext'
import rupeeFormatter from 'rupee-formatter'
import Accordion from "../accordion/Accordion"
import Image from 'next/image'
import url from '../../public/images/heart.gif'



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
      <h2 className="text-2xl font-bold font-lora">{product.title}</h2>
      <span className="pb-6 mt-2 text-lg font-semibold text-gray-800">{rupeeFormatter(selectedVariant.variantPrice)}</span>

      {inCart
        ?
        <>
          <div className="w-32 h-32 absolute bottom-2 left-1/3 ">
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
        <Accordion title="Shipping and Returns" content={"lore u"}/>
      </div>
    </div>
  )
}

export default ProductForm