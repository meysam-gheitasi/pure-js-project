const productsDOM = document.querySelector('.products-center')

const cartItems = document.querySelector('.cart-items')
const cartIotal = document.querySelector('.cart-total')

const cartContent = document.querySelector('.cart-content')

const cartDom = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')

const cartButton = document.querySelector('.cart-btn')
const closeButton = document.querySelector('.close-cart')

const clearCartBtn = document.querySelector('.clear-cart')
const removeItemBtn = document.querySelector('.remove-item')

let cart = []

// display Products mehtods :

const displayProducts = (products) => {

  let result = ''

  products.forEach(item => {
    if (item.exist) {
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
    }
  })

  productsDOM.innerHTML = result

}

const getCardbuttons = () => {

  const bagbtns = [...document.querySelectorAll('.bag-btn')]

  bagbtns.forEach(item => {

    item.addEventListener('click', e => {

      let id = e.target.dataset.id
      let cartItem = cart.find(item => item.id === id)

      if (cartItem) {
        cartItem.amount += 1
      } else {
        cart = [...cart, getProducts(id)]
      }
      saveCart(cart)
      setCartValues(cart)
      addCartItem(cart)
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

const addCartItem = cart => {

  cartContent.innerHTML = ''
  cart.forEach(item => {

    const div = document.createElement('div')
    div.classList.add('cart-item')

    div.innerHTML += `
      <img src=${item.image} alt=${item.title} />
      <div>
        <h4>${item.title}</h4>
        <h5>${item.price}</h5>
        <span class="remove-item" data-id=${item.id}>حذف</span>
      </div>
      <div>
        <i class="fas fa-chevron-up" data-id=${item.id}></i>
        <p class="item-amount">${item.amount}</p>
        <i class="fas fa-chevron-down" data-id=${item.id}></i>
      </div>
    `
    cartContent.appendChild(div)
  })
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

  const products = getData('products')
  cart = getCart()
  displayProducts(products)
  getCardbuttons()
  setCartValues(cart)
  addCartItem(cart)
  cartProcess()
}


const cartProcess = () => {

  clearCartBtn.addEventListener('click', () => {

    clearCart()

  })

  cartContent.addEventListener('click', e => {

    if (e.target.classList.contains('remove-item')) {

      let item = e.target
      let id = item.dataset.id

      cartContent.removeChild(item.parentElement.parentElement)
      removeProduct(id)
    }

    e.target.classList.contains('fa-chevron-up') && changeAmount(e.target, 'increase')

    e.target.classList.contains('fa-chevron-down') && changeAmount(e.target, 'decrease')

  })
}

const clearCart = () => {

  const cartsId = cart.map(item => item.id)

  cartsId.forEach(item => removeProduct(item))

  while (cartContent.children.length > 0) {
    cartContent.removeChild(cartContent.children[0])
  }

}

const removeProduct = id => {

  cart = cart.filter(item => item.id !== id)
  setCartValues(cart)
  saveCart(cart)

}

const changeAmount = (item, type) => {

  let id = item.dataset.id
  let product = cart.find(item => item.id === id)

  if (type === 'increase') {
    product.amount += 1
    item.nextElementSibling.innerText = product.amount
  } else if (type === 'decrease' && product.amount > 1) {
    product.amount -= 1
    item.previousElementSibling.innerText = product.amount
  } else {
    cartContent.removeChild(item.parentElement.parentElement)
    removeProduct(id)
    return
  }

  setCartValues(cart)
  saveCart(cart)

}

// save and read data as locale storage:

const saveProducts = products => {

  localStorage.setItem('products', JSON.stringify(products))

}
const saveCart = cart => {

  localStorage.setItem('cart', JSON.stringify(cart))

}
// get cart as localStorage or return empty array
const getData = key => {

  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : []
}
const getCart = () => {

  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []

}

const getProducts = id => {

  let products = JSON.parse(localStorage.getItem('products'))
  return products.find(item => item.id === id)

}

document.addEventListener('DOMContentLoaded', () => {

  initApp()


})
