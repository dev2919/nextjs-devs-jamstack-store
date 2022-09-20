import React, { useEffect } from "react";
import { getProductsInCollection, getAllProductsInCollection } from '../adapters/shopify'
import { getCollection } from '../adapters/sanity'
import ProductList from '../components/productList/ProductList'
import Pagination from '../components/pagination/Pagination'
import Head from 'next/head';
import Script from "next/script";
import Thumbnail from '../public/images/logo.png'
import CategoryBox from '../components/categoryBox/categoryBox'
import CollectionBox from '../components/collectionBox/collectionBox'
import SearchBar from '../components/searchBar/SearchBar'
// import Chatbot from '../components/chatbot/chatbot'


function Home({ products, collectionList, variants }){

  useEffect(() => {

    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "c55fy7so9n");

  }, [])
  

  return (
    <>
      <Head>
        <title>Thrift Bharat 🇮🇳</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="thrift • streetwear • vintage • clothing shop" />
        <meta property="og:title" content="Thrift Bharat 🇮🇳" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://i.imgur.com/xI9KNoX.jpg" />
        <script src="https://cdn.shopify.com/shopifycloud/shopify_chat/storefront/shopifyChatV1.js?api_env=production&button_color=black&button_style=text&i=chat_bubble&p=bottom_right&shop_id=i0Lfmnd84Yn_UdarNvEgLbwje-AgEhi32MwKRuBAva8&t=chat_with_us&v=1&shop=thrift-bharat.myshopify.com"></script>
        <script src="https://cdn.shopify.com/shopifycloud/shopify_chat/storefront/shopifyChatV1Widget.js?api_env=production&button_color=%23202A36&pusher_key=undefined&shop_id=i0Lfmnd84Yn_UdarNvEgLbwje-AgEhi32MwKRuBAva8&button_style=text&p=bottom_right&v=1"></script>
      </Head>
      <div className="text-3xl">
        <SearchBar />
        <div className="max-w-2xl lg:max-w-7xl m-auto flex flex-col lg:flex-row">
        <div className="flex w-auto lg:flex-row lg:w-auto ">
            <CollectionBox collectionList={collectionList[0]} />
            <CollectionBox collectionList={collectionList[1]} />
          </div>
          <div className="flex w-auto lg:flex-row lg:w-auto ">
            <CollectionBox collectionList={collectionList[2]} />
            <CollectionBox collectionList={collectionList[3]} />
          </div>
        </div>
        <ProductList products={products} variants={variants} category={"home-page"} ></ProductList>
        <Pagination products={products} category={"home-page"} > </Pagination>


      </div>
      <div id="shopify-chat" style={{zIndex: 2147483647}}>
        <iframe title="Shopify online store chat" buttonstyle="text" buttonposition="bottom_right" id="ShopifyChat" scrolling="no" zindex={2147483647} srcDoc="<!DOCTYPE html><html lang='en'><head><link rel='stylesheet' type='text/css' href='https://cdn.shopifycloud.com/shopify_chat/storefront/style.css'></head><body></body></html>" style={{"position": "fixed","bottom":"24px","border":"none","zIndex":"2147483647","overflow":"hidden","right":"24px","width":"150px","height":"68px"}} />
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {

  const products = await getProductsInCollection("home-page")
  const variants = await getAllProductsInCollection()

  const collectionList  = await getCollection();   

  return {
    props: { products, collectionList, variants }, // will be passed to the page component as props
    revalidate: 10
  }
}
