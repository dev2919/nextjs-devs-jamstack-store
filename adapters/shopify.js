const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-01/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(response => {
     return response.json()
    })

    return data
  } catch (error) {
    throw new Error("Product not fetched")
  }
}

//TODO increase product range per query 

//TODO getProductsInCollection make it dynamic for collection.

export async function getProductsInCollection(category, filter) {
  let filters = "available: true"
  if(filter){
    filters = filter ;
  }
  const query = `
  {
    collection(handle: "${category}") {
      title
      products(first: 4 , after:null, filters: {${filters}}) { 
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            priceRange {
              minVariantPrice {
                amount
              }
            }
            handle
            variants(first: 1) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  altText
                  url
                }
              }
            }
          }
        }
      }
    }

  collections(first: 20){
      edges{
        node{
          handle
        }
      }
    }

  }`

  const response = await ShopifyData(query)

  const allProducts = response.data.collection.products.edges ? response.data.collection.products : []

  return allProducts

}

export async function getAllProductsInCollection() {
  const query = `
  {
    collection(handle: "Home-page") {
      title
      products(first: 200 , after:null) { 
        edges {
          cursor
          node {
            id
            title
            priceRange {
              minVariantPrice {
                amount
              }
            }
            handle
            variants(first: 1) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  altText
                  url
                }
              }
            }
          }
        }
      }
    }

    collections(first: 20){
      edges{
        node{
          handle
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const allProducts = response.data.collection.products.edges ? response.data.collection.products.edges : []
  const allCollections = response.data.collections.edges ? response.data.collections.edges : []


  return [ allProducts, allCollections  ]

}

export async function getProductsAfterPagination(cursor, category, filter) {
  
  let filters = "available: true"
  if(filter){
    filters = filter ;
  }

  const query = `
  {
    collection(handle: "${category}") {
      title
      products(first: 4 , after:"${cursor}", filters: {${filters}}) { 
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            priceRange {
              minVariantPrice {
                amount
              }
            }
            handle
            variants(first: 1) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  altText
                  url
                }
              }
            }
          }
        }
      }
    }
  }`
 
  const response = await ShopifyData(query)

  const allProducts = response.data.collection.products.edges ? response.data.collection.products : []

  return allProducts

} 

export async function getProductsBeforePagination(cursor, category, filter) {
  
  let filters = "available: true"
  if(filter){
    filters = filter ;
  }

  const query = `
  {
    collection(handle: "${category}") {
      title
      products(last: 4 , before:"${cursor}", filters: {${filters}}) { 
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            title
            priceRange {
              minVariantPrice {
                amount
              }
            }
            handle
            variants(first: 1) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  altText
                  url
                }
              }
            }
          }
        }
      }
    }
  }`
 
  const response = await ShopifyData(query)

  const allProducts = response.data.collection.products.edges ? response.data.collection.products : []

  return allProducts

} 

export async function getProduct(handle) {

  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      descriptionHtml 
      images(first: 5) {
        edges {
          node {
            altText
            url
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 45) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`

  const response = await ShopifyData(query)

  const product = response.data.productByHandle ? response.data.productByHandle : []
 
  return product
}

export async function createCheckout(id, quantity) {
  const query= `
  mutation {
    checkoutCreate(input: {
      lineItems: [{ variantId:"${id}", quantity: ${quantity}}]
    }) {
      checkout {
        id
        webUrl
      }
    }
  }
  `

  const response = await ShopifyData(query)

  const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []

  return checkout

}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map(item => {
    return `{
      variantId: "${item.id}",
      quantity: ${item.variantQuantity}
    }`
  })


  const query= `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
      }
    }
  }`

  
  const response = await ShopifyData(query)
  
  const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []

  return checkout

}