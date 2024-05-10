const productsDOM = document.querySelector('.products-center')

const cartItems = document.querySelector('.cart-items')
const cartIotal = document.querySelector('.cart-total')

const cartContent = document.querySelector('.cart-content')

const cartDom = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')

const cartButton = document.querySelector('.cart-btn')
const closeButton  = document.querySelector('.close-cart')

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

// display Products mehtods :

const displayProducts = products => {

  let result = ''

  products.forEach(item => {
    result += `
    <article class="product">
      <div class="img-container">
        <img
          src=${item.image}
          alt=${item.title}
          class="product-img"
        />
        <button class="bag-btn" data-id=${item.id}>افزودن به سبد خرید</button>
      </div>
      <h3>${item.title}</h3>
      <h4>${item.price}</h4>
    </article>
    `
  })

  productsDOM.innerHTML = result

}

const getCardbuttons = () => {

  const bagbtns = [...document.querySelectorAll('.bag-btn')]

  bagbtns.forEach(item => {

    item.addEventListener('click', e => {

      let id = e.target.dataset.id
      let cartItem = { ...getProducts(id), amount: 1 }
      cart = [...cart, cartItem]
      addCartItem(cartItem)
      setCartValues(cart)
      saveCart(cart)

    })

  })
}

const setCartValues = cart => {

  let totoalPrice = 0
  let totalItems = 0
  
  cart.forEach(item => {
    totoalPrice += item.price * item.amount
    totalItems += item.amount
  })

  cartIotal.innerText = totoalPrice
  cartItems.innerText = totalItems

}

const addCartItem = item => {

  const div = document.createElement('div')
  div.classList.add('cart-item')

    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item">حذف</span>
      </div>
      <div>
        <i class="fas-fa-chevron-up"></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas-fa-chevron-down"></i>
      </div>
    `

  cartContent.appendChild(div)

}

const showCart = () => {
  
  cartOverlay.classList.add('transparentBcg')
  cartDom.classList.add('showCart')

}

const closeCart = () => {

  cartOverlay.classList.remove('transparentBcg')
  cartDom.classList.remove('showCart')

}

cartButton.addEventListener('click', showCart)

closeButton.addEventListener('click', closeCart)

const initApp = () => {

  cart = getCart()
  setCartValues(cart)
  populate(cart)

}

const populate = (cart) => {

  cart.forEach(item => {
    return addCartItem(item)
  })

}

// save and read data as locale storage:

const saveProducts = products => {

  localStorage.setItem('productsData', JSON.stringify(products))

}
const saveCart = cart => {

  localStorage.setItem('cart', JSON.stringify(cart))

}
const getCart = () => {

  return localStorage.getItem('cart') 
  ? JSON.parse(localStorage.getItem('cart')) 
  : []

}

const getProducts = id => {

  let products = JSON.parse(localStorage.getItem('productsData'))
  return products.find(item => item.id === id)

}

document.addEventListener('DOMContentLoaded', () => {

  initApp()

  getData().then(data => {
    displayProducts(data)
    saveProducts(data)
  })
    .then(() => {
      getCardbuttons()
    })

})
