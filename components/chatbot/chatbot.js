import React, {useState} from 'react'
import { useRouter } from 'next/router'

const Chatbot = () => {

  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
    

    return (
      <div id="shopify-chat" style={{zIndex: 2147483647}}>
        <iframe title="Shopify online store chat" buttonstyle="text" buttonposition="bottom_right" id="ShopifyChat" scrolling="no" zindex={2147483647} srcDoc="<!DOCTYPE html><html lang='en'><head><link rel='stylesheet' type='text/css' href='https://cdn.shopifycloud.com/shopify_chat/storefront/style.css'></head><body></body></html>" style={{"position": "fixed","bottom":"24px","border":"none","zIndex":"2147483647","overflow":"hidden","right":"24px","width":"150px","height":"68px"}} />
      </div>
    )
}

export default Chatbot