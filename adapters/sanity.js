async function SanityData(query) {
  // const query = `*[_type == "Collection"]`
  const uri = encodeURIComponent(query)
  const URL = `https://20uzw62k.api.sanity.io/v1/data/query/production?query=${query}`


  try {
    const data = await fetch(URL).then(response => {
     return response.json()
    })
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getCollection() {

  const query = `*[_type == "Collection" || _type == "Category" ]`

  const response = await SanityData(query)

  const data = response.result?response.result : []

  return data
}

export async function getInfoPage() {

  const query = `*[_type == "InfoPage" ]`

  const response = await SanityData(query)

  const data = response.result?response.result : []

  return data
}

export async function getInfoPageByTitle(slug) {

  const query = `*[slug.current == "${slug}" ]`

  const response = await SanityData(query)

  const data = response.result?response.result : []

  return data
}