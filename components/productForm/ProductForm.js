import { useState, useContext, useEffect } from "react"
// import {formatter} from '../ut'
import {CartContext} from '../../context/shopContext'
import rupeeFormatter from 'rupee-formatter'

const ProductForm = ({ product }) => {

  const { addToCart, cart, setCartOpen } = useContext(CartContext)
  const [inCart, setInCart] = useState(false)

  useEffect(() => {
    for (let index = 0; index < cart.length; index++) {
      if(cart[index].splId===product.id){
        setInCart(true)
        console.log(cart[index].splId, product.id);
        break
      } else {
        setInCart(false)
        console.log(cart[index].splId, product.id);
      }
    }
    
    return
  }, [])

  useEffect(() => {
    cart.length? null : setInCart(false) 

    for (let index = 0; index < cart.length; index++) {
      if(cart[index].splId===product.id){
        setInCart(true)
        console.log(cart[index].splId, product.id);
        break
      } else {
        setInCart(false)
        console.log(cart[index].splId, product.id);
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

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])


  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold font-lora">{product.title}</h2>
      <span className="pb-6 mt-2 text-lg font-semibold text-gray-800">{rupeeFormatter(selectedVariant.variantPrice)}</span>

      {inCart
        ?
        <button
        onClick={() => setCartOpen(true) }
        className={`bg-black rounded-full text-white px-2 py-3 hover:bg-gray-300 font-lora `}> 
        in your cart
        </button> : 
        <button
        onClick={() => addToCart(selectedVariant) }
        className={`bg-black rounded-full text-white px-2 py-3 hover:bg-gray-300 font-lora `}> 
         add to cart
        </button>
      }
  
      <p className="pb-6 mt-2 text-base text-gray-800" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
    </div>
  )
}

export default ProductForm