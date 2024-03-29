/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, useContext } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import {CartContext} from '../../context/shopContext'
import { getProductsInCollection } from '../../adapters/shopify';

  const variantSize = [
    {
        id: 1,
        name: "All sizes",
        val: 'available: true',
    }
  ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({variants, category}) {
  const [selected, setSelected] = useState(variantSize[0])
  const { setSizeSelected, sizeSelected, getPaginatedProducts, setpageInfo} = useContext(CartContext)

  useEffect(() => {

    console.log(variants);
    
    if(Array.isArray(variants)){
    variants[0].forEach(item => {

      let value = item.node.variants.edges[0].node.selectedOptions[0].value
  
      if (variantSize.findIndex(item => item.name === value ) === -1) {
          variantSize.push({
              "id": (variantSize.length + 1),
              "name": value
          });
        }
      }); 
            
    } else if(variants) {
      variants.edges.forEach(item => {

        let value = item.node.variants.edges[0].node.selectedOptions[0].value
    
        if (variantSize.findIndex(item => item.name === value ) === -1) {
            variantSize.push({
                "id": (variantSize.length + 1),
                "name": value
            });
          }
        }); 
    }
    
  }, [])
  
   useEffect(async () => {

     if(selected.name == 'All sizes' && category){

       setSizeSelected(``)
       const products = await getProductsInCollection(`${category}`, ``)

       getPaginatedProducts(products.edges)
       setpageInfo(products.pageInfo)
    
      } else if(category) {

        setSizeSelected(`variantOption: {name: "${isNaN(selected.name)?"Size":"Size"}", value: "${selected.name}"}`)
        const products = await getProductsInCollection(`${category}`, `variantOption: {name: "${isNaN(selected.name)?"Size":"Size"}", value: "${selected.name}"}`)
        
        getPaginatedProducts(products.edges)
        setpageInfo(products.pageInfo)
      }

   }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-40 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate text-sm ">{selected.name}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {variantSize.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {person.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
