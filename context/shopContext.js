import { createContext, useState, useEffect, Children } from "react"
import { createCheckout, updateCheckout } from "../adapters/shopify"

const CartContext = createContext()

export default function ShopProvider({children}) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [allProductItems, setProductItems] = useState(false)
  const [pageInfo, setpageInfo] = useState({hasNextPage: false, hasPreviousPage: false})
  const [globalItemPrevCursor, setGlobalItemPrevCursor] = useState(false)
  const [globalItemCursor, setGlobalItemCursor] = useState(false)
  const [sizeSelected, setSizeSelected] = useState('')

  


  // check cart in local storage and restore cart
  useEffect(() => {
    if(localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id)

      if(cartObject[0].id) {
        setCart([cartObject[0]])
      } else if (cartObject[0].length > 0){
        setCart(...[cartObject[0]])
      }

      setCheckoutId(cartObject[1].id)
      setCheckoutUrl(cartObject[1].webUrl)
    }
  }, [])

  function getPaginatedProducts(products) {
    setProductItems(products)
  }


  async function addToCart(newItem) {

    setTimeout(() => {
      setCartOpen(true)
    }, 1200);

    if(cart.length === 0){
      setCart([newItem])

      const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)


      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
    } else {
      let newCart = [...cart]

      cart.map(item =>{
        if(item.id === newItem.id) {
          item.variantQuantity++
          newCart = [...cart]
        } else{
          newCart = [...cart, newItem]
        }
      })

      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))

    }
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter(item => item.id !== itemToRemove)

    setCart(updatedCart)

    const newCheckout = await updateCheckout(checkoutId, updatedCart)

    localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))
    
    if (cart.length === 1) {
      setCartOpen(false)
    }
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl,
      removeCartItem,
      getPaginatedProducts,
      allProductItems,
      setpageInfo,
      pageInfo,
      globalItemPrevCursor, setGlobalItemPrevCursor,
      globalItemCursor, setGlobalItemCursor,
      sizeSelected, setSizeSelected
    }}>
      {children}
    </CartContext.Provider>
  )
}
const ShopConsumer = CartContext.Consumer

export { ShopConsumer, CartContext}

