
let cart = []

const getData = async () => {

  try {

    const result = await fetch('products.json')
    const data = await result.json()
    let products = data.items

    products = products.map(item => {

      const { id } = item.sys
      const { title, price } = item.fields
      const image = item.fields.image.fields.file.url

      return { id, title, price, image }
    })

    return products

  } catch (err) {
    console.log(err);
  }
}

const displayProducts = products => {
  
}

document.addEventListener('DOMContentLoaded', () => {

  getData().then(data => console.log(data));

})
