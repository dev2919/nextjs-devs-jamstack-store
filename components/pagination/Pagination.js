import React, { useEffect, useState, useContext } from "react";
import FeatherIcon from 'feather-icons-react';
import { getProductsAfterPagination } from '../../adapters/shopify';
import { getProductsBeforePagination } from '../../adapters/shopify';
import {CartContext} from '../../context/shopContext'
const Pagination = ({ products, category }) => {

  const [productItems, setProductItems] = useState(products.edges)
  const [itemCursor, setItemCursor] = useState( products.edges[products.edges.length - 1] )
  const [itemPrevCursor, setItemPrevCursor] = useState( products.edges[0] )

  const { getPaginatedProducts, pageInfo, setpageInfo, globalItemPrevCursor, setGlobalItemPrevCursor,
    globalItemCursor, setGlobalItemCursor, sizeSelected } = useContext(CartContext)
  
    useEffect(() => {
      getPaginatedProducts(productItems.edges)
  }, [productItems])

  

  //to preserve pagination after coming back
  useEffect(() => {
    if(globalItemPrevCursor || globalItemCursor){
      setItemCursor(globalItemCursor)
      setItemPrevCursor(globalItemPrevCursor)
      console.log(globalItemCursor.cursor, globalItemPrevCursor.cursor);
    }
    setpageInfo(products.pageInfo);

  }, [])

  useEffect(() => {
    if(globalItemPrevCursor || globalItemCursor){
      setItemCursor(globalItemCursor)
      setItemPrevCursor(globalItemPrevCursor)
      // console.log(globalItemCursor.cursor, globalItemPrevCursor.cursor);
    }


  }, [globalItemPrevCursor])
  

  return (
    <div className=" px-4 py-3 flex items-center justify-center sm:px-6 w-full max-w-7xl m-auto">
      <div className=" sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
            {pageInfo.hasPreviousPage ?
            <a
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"

              onClick={async () => {
              let temp = await getProductsBeforePagination(itemPrevCursor.cursor, category, sizeSelected)
              setProductItems(temp)
              setpageInfo(temp.pageInfo)
              temp = temp.edges
              setItemPrevCursor(temp[0])
              setItemCursor(temp[temp.length - 1])
              setGlobalItemCursor(temp[temp.length - 1])
              setGlobalItemPrevCursor(temp[0])

            }
            }

            >
              <span className="sr-only">Previous</span>
              <FeatherIcon size="32" icon="arrow-left" />
            </a>
            : null 
            }

            {pageInfo.hasNextPage ?
            <a
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
             
              onClick={async () => {
                    
                let temp = await getProductsAfterPagination(itemCursor.cursor, category, sizeSelected)
                setProductItems(temp)

                setpageInfo(temp.pageInfo)
                temp = temp.edges
                setItemCursor(temp[temp.length - 1])
                setItemPrevCursor(temp[0])
                setGlobalItemCursor(temp[temp.length - 1])
                setGlobalItemPrevCursor(temp[0])

            }
            }


            >
              <span className="sr-only">Next</span>
              <FeatherIcon size="32" icon="arrow-right" />

            </a>
          : null
          }
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination